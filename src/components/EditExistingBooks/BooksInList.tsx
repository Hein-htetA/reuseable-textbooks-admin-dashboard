import React from "react";
import { useSelector } from "react-redux";
import {
  SelectSearchResults,
  SelectSearchStatus,
} from "../../features/book/bookSlice";
import SearchLoading from "./SearchLoading";
import SingleBook from "./SingleBook";

const BooksInList = () => {
  const searchResults = useSelector(SelectSearchResults);
  const searchStatus = useSelector(SelectSearchStatus);

  if (searchStatus === "loading") {
    return <SearchLoading />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-3 sm:gap-6 md:grid-cols-4 my-4 w-fit md:mr-auto md:ml-0">
      {searchResults.map((book) => (
        <SingleBook key={book._id} bookInfo={book} />
      ))}
    </div>
  );
};

export default BooksInList;
