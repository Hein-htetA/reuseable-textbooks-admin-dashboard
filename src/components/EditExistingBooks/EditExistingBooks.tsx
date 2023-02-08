import React from "react";
import SearchBookByName from "./SearchBookByName";
import SearchLoading from "./SearchLoading";

const EditExistingBooks = () => {
  return (
    <div>
      <SearchBookByName />
      <SearchLoading />
    </div>
  );
};

export default EditExistingBooks;
