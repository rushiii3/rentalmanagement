import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavbarShow = ({ children }) => {
  const Location = useLocation();
  const [Show, setShow] = useState(false);
  useEffect(() => {
    if (
      Location.pathname === "/Login" ||
      Location.pathname === "/login" ||
      Location.pathname === "/register" ||
      Location.pathname === "/Register" ||
      Location.pathname === "/"
    ) {
      setShow(false);
    } else if (
      Location.pathname === "/" ||
      Location.pathname === "/about" ||
      Location.pathname === "/addpost" ||
      Location.pathname === "/property-bookings" ||
      Location.pathname === "/chat" ||
      Location.pathname === "/properties" ||
      Location.pathname === "/profile-update" ||
      Location.pathname === "/add-property" ||
      Location.pathname === "/bookings" ||
      Location.pathname === "/report" ||
      Location.pathname === "/dashboard" ||
      Location.pathname === "/admin-reports" ||
      Location.pathname === "/group-chat" ||
      Location.pathname === "/landlord-lease" ||
      Location.pathname === "/tenant-lease" ||
      Location.pathname === "/tenant-maintenance" ||
      Location.pathname === "/landlord-maintenance" ||
      Location.pathname === "/tenant-monthly-rent" ||
      Location.pathname === "/landlord-monthly-rent" ||
      Location.pathname === "/tenant-review" ||
      Location.pathname === "/property"
    ) {
      setShow(true);
    } else if (
      Location.pathname.includes("/properties/") ||
      Location.pathname.includes("/video-conference/")
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [Location]);

  return <>{Show && children}</>;
};

export default NavbarShow;
