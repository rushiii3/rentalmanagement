import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { userServer } from "../../../server";
import toast from "react-hot-toast";
import store from "../../../Redux/store";
import { LoadUser } from "../../../Redux/action/user";
import { useDispatch } from "react-redux";
const Navbar1 = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);
  const [Mode, setMode] = useState(useState(mode !== null));
  const handleMode = () => {
    if (Mode) {
      dispatch({ type: "EnableDarkMode" });
      console.log("dispatched");
    } else {
      dispatch({ type: "EnableLightMode" });
    }
    setMode(!Mode);
  };
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const role = user?.user.role;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const menuItems = [
    {"name":"Properties ","location":"/properties","key":"tenant-property","user":"t"},
    {"name":"Properties ","location":"/property","key":"property-landlord","user":"l"},
    {"name":"Chat ","location":"/chat","key":"chat","user":"b"},
    {"name":"Report Issue ","location":"/report","key":"report","user":"b"},
    {"name":"Group Chat ","location":"/group-chat","key":"group-chat","user":"t"},
    {"name":"Issues","location":"/admin-reports","key":"admin-issues","user":"a"},
    {"name":"Dashboard","location":"/dashboard","key":"admin-dashboard","user":"a"},
  ];
  const DropDrowList = [
    {"name":"Bookings ","location":"/bookings","key":"tenant-booking","user":"t"},
    {"name":"Bookings ","location":"/property-bookings","key":"landlord-booking","user":"l"},
    {"name":"Lease Agreement","location":"/landlord-lease","key":"landlord-lease","user":"l"},
    {"name":"Lease Agreement","location":"/tenant-lease","key":"tenant-lease","user":"t"},
    {"name":"Maintenance Request","location":"/landlord-maintenance","key":"landlord-maintenance","user":"l"},
    {"name":"Maintenance Request","location":"/tenant-maintenance","key":"tenant-maintenance","user":"t"},
    {"name":"Review","location":"/tenant-review","key":"tenant-review","user":"t"},
  ]

  console.log(DropDrowList);
  const closeMenu = () => {
    setIsMenuOpen(false); // Function to close the Navbar menu
  };
  const Logout = async () => {
    try {
      const serverResponse = await axios.get(`${userServer}/logout`, {
        withCredentials: true,
      });
      console.log(serverResponse);
      if (serverResponse.data.success) {
        toast.success("Log out successful!");
        store.dispatch(LoadUser());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="sm:px-5"
        isBordered={true}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          />
          <NavbarBrand>
            <img
              src="https://i.ibb.co/b26sP9h/image-4.png"
              className="h-8 mr-3"
              alt=""
            />

            <p className="font-bold text-inherit">RentMe</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItems.map((item, index) => {
        // Check if role is defined before comparing
        if (role && item.user.toLowerCase() === role.toLowerCase()) {
          return (
            <NavbarItem key={item.key}>
              <Link color="foreground" to={item.location}>
                {item.name}
              </Link>
            </NavbarItem>
          );
        } else {
          if (role && item.user.toLowerCase() === "b") {
            return (
              <NavbarItem key={item.key}>
                <Link color="foreground" to={item.location}>
                  {item.name}
                </Link>
              </NavbarItem>
            );
          }
        }
      })}
          
        </NavbarContent>

        <NavbarContent justify="end">
          {!isAuthenticated ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link to="/login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  color="primary"
                  onClick={() => {
                    navigate("/register");
                  }}
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <Dropdown placement="bottom-start" className={mode}>
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: `${user?.user?.imgurl}`,
                    }}
                    className="transition-transform"
                    // description={user?.user?.email}
                    name={user?.user?.firstname + " " + user?.user?.lastname}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <Link to="/">
                      <p className="font-bold">Signed in as</p>
                      <p className="font-bold">{user?.user?.email}</p>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="darkmode" onClick={handleMode}>
                    {Mode ? "Dark Mode" : "Light Mode"}
                  </DropdownItem>
                  <DropdownItem
                    key="settings"
                    onClick={() => {
                      navigate("/profile-update");
                    }}
                  >
                    My Profile
                  </DropdownItem>
                  {DropDrowList.map((value, key) => {
        if (value.user.toLowerCase() === role.toLowerCase()) {
          return (
            <DropdownItem
              key={value.key}
              onClick={() => {
                navigate(value.location);
              }}
            >
              {value.name}
            </DropdownItem>
          );
        } else {
          return null; // Return null for items not matching the role
        }
      })}
                  
                  <DropdownItem key="logout" color="danger" onClick={Logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                size="lg"
                onClick={closeMenu}
                to="/properties"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default Navbar1;
