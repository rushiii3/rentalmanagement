import React from "react";
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
const Navbar1 = () => {
  const {isAuthenticated, user } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const closeMenu = () => {
    setIsMenuOpen(false); // Function to close the Navbar menu
  };
  const Logout = async() => {
    try {
      const serverResponse = await axios.get(`${userServer}/logout`,{withCredentials:true});
      console.log(serverResponse);
      if(serverResponse.data.success){
        toast.success("Log out successful!");
        store.dispatch(LoadUser());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <Navbar isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="sm:px-5" isBordered={true}>
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
          <NavbarItem>
            <Link color="foreground" to="/properties">
              Properties
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link href="#" aria-current="page">
              Chat
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link href="#" aria-current="page">
              Report
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link href="#" aria-current="page">
              Maintenance
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link href="#" aria-current="page">
              Rent
            </Link>
          </NavbarItem>
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
              <Dropdown placement="bottom-start">
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
                  <DropdownItem key="settings" onClick={() =>{navigate('/profile-update')} }>My Profile</DropdownItem>
                  <DropdownItem key="team_setbookingsings" onClick={() =>{navigate('/bookings')} }>Bookings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
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
