import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,NavbarMenuItem,NavbarMenu,NavbarMenuToggle} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const Navbar1 = () => {
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
        <img src="https://github.com/rushiii3/rentalmanagement/blob/main/FrontEnd/src/Assets/Logo.png?raw=true" className='h-8 mr-3' alt="" />

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