import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button,NavbarMenuItem,NavbarMenu,NavbarMenuToggle} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
const Navbar1 = () => {
  const {loading,isAuthenticated,user} = useSelector((state)=>state.user);
    console.log(user?.user);
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
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
        <img src="https://i.ibb.co/b26sP9h/image-4.png" className='h-8 mr-3' alt="" />

          <p className="font-bold text-inherit">RentMe</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link onClick={()=>{navigate('/login')}}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" onClick={()=>{navigate('/register')}} variant="flat">
            Sign Up
          </Button>
        </NavbarItem>

        <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `${user?.user?.imgurl}`,
            }}
            className="transition-transform"
            description={user?.user?.email}
            name={user?.user?.firstname +' '+ user?.user?.lastname}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <Link to='/'>
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{user?.user?.email}</p>
            </Link>
            
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Navbar1