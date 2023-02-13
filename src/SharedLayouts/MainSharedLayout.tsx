import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { selectIsLoggedIn } from "../features/user/userSlice";
import ScrollToTop from "./ScrollToTop";

const MainSharedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainSharedLayout;
