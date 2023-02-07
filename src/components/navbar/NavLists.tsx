import React from "react";
import { NavLink } from "react-router-dom";

const activeClass = "px-2 py-1 border-2 border-slate-500 rounded-lg";
const normalClass =
  "px-2 py-1 border-2 border-b-slate-500 border-x-white border-t-white";

const NavLists = () => {
  return (
    <ul className="flex text-xs flex-wrap justify-around mt-5 mb-1 w-full gap-x-2 gap-y-5">
      <li>
        <NavLink
          to={"/add-new-book"}
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Add New Book
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/edit-existing-books"}
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Edit Existing Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/orders"}
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Manage Orders
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLists;
