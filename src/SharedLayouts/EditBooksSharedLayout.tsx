import React from "react";
import SearchBookByName from "../components/EditExistingBooks/SearchBookByName";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features/user/userSlice";

const EditBooksSharedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="p-5 flex flex-col gap-3">
      <SearchBookByName />
      <Outlet />
    </div>
  );
};

export default EditBooksSharedLayout;
