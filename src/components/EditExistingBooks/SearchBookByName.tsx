import React, { FormEvent, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  searchBookByTitle,
  SelectSearchStatus,
} from "../../features/book/bookSlice";
import { useNavigate } from "react-router-dom";

const SearchBookByName = () => {
  const [title, setTitle] = useState("");

  const searchStatus = useSelector(SelectSearchStatus);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/edit-existing-books");
    if (searchStatus === "loading" || !title) return;
    dispatch(searchBookByTitle(title));
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-3 items-center justify-center mt-2"
    >
      <input
        type="text"
        className="p-2 border-2 border-slate-500 rounded-lg outline-none text-xs w-3/4"
        placeholder="Enter the book title"
        name="title"
        value={title}
        onChange={onChangeTitle}
      />
      <button
        type="submit"
        className="text-sm px-3 py-1 bg-slate-600 text-white rounded-full capitalize"
        disabled={searchStatus === "loading"}
      >
        {searchStatus === "loading" ? "Searching" : "Search"}
      </button>
    </form>
  );
};

export default SearchBookByName;
