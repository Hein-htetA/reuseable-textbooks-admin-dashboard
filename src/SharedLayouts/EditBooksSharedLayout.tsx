import React from "react";
import SearchBookByName from "../components/EditExistingBooks/SearchBookByName";
import { Outlet } from "react-router-dom";

const EditBooksSharedLayout = () => {
  return (
    <div className="p-5 flex flex-col gap-3">
      <SearchBookByName />
      <Outlet />
    </div>
  );
};

export default EditBooksSharedLayout;
