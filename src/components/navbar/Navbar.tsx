import React, { useState, useRef, useEffect, useCallback } from "react";
import BrandName from "./BrandName";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import NavLists from "./NavLists";
import LoginRegisterBtn from "./LogoutBtn";

type auth = "login" | "register";

const Navbar = () => {
  const [loginOrRegister, setLoginOrRegister] = useState<auth>("login");
  const [profileShow, setProfileShow] = useState(false);

  const authenticationModalOpen: boolean = useAppSelector(
    (state) => state.user.authenticationModalOpen
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <nav className="py-4 px-4 shadow-[0px_1px_8px_0px_rgba(94,87,94,0.2)] flex  flex-col justify-between items-center sticky top-0 z-40 bg-white">
      <div className="flex justify-between w-full items-end">
        <BrandName />
        <LoginRegisterBtn />
      </div>

      <NavLists />
    </nav>
  );
};

export default Navbar;
