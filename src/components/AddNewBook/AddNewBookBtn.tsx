import React from "react";
import { useSelector } from "react-redux";
import { SelectAddNewBookStatus } from "../../features/book/bookSlice";

interface Props {
  handleNewBookUpload: () => void;
}

const AddNewBookBtn = ({ handleNewBookUpload }: Props) => {
  const addNewBookStatus = useSelector(SelectAddNewBookStatus);
  return (
    <button
      className="py-2 rounded-xl uppercase bg-slate-700 disabled:bg-slate-500 text-white text-base mb-5 tracking-widest"
      onClick={handleNewBookUpload}
      disabled={addNewBookStatus === "loading"}
    >
      {addNewBookStatus === "loading"
        ? "uploading"
        : addNewBookStatus === "failed"
        ? "Failed: Try Again"
        : addNewBookStatus === "idle"
        ? "upload"
        : "uploaded"}
    </button>
  );
};

export default AddNewBookBtn;
