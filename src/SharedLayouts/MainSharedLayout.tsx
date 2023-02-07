import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
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
