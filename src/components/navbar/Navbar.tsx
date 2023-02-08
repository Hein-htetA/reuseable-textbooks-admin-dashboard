import React from "react";
import BrandName from "./BrandName";
import NavLists from "./NavLists";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../features/user/userSlice";

const Navbar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className="py-4 px-4 shadow-[0px_1px_8px_0px_rgba(94,87,94,0.2)] flex  flex-col justify-between items-center sticky top-0 z-40 bg-white">
      <div className="flex justify-between w-full items-end">
        <BrandName />
        {isLoggedIn && <LogoutBtn />}
      </div>
      <NavLists />
    </nav>
  );
};

export default Navbar;
