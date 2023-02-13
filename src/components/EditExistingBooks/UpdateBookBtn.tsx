import React from "react";
import { useSelector } from "react-redux";
import { SelectUpdateStatus } from "../../features/book/bookSlice";

interface Props {
  handleUpdateBook: () => void;
}

const UpdateBookBtn = ({ handleUpdateBook }: Props) => {
  const updateStatus = useSelector(SelectUpdateStatus);

  return (
    <button
      className=" py-2 bg-slate-600 text-white rounded-full disabled:bg-slate-400 mx-auto w-full"
      onClick={handleUpdateBook}
      disabled={updateStatus === "loading"}
    >
      {updateStatus === "loading"
        ? "Updating"
        : updateStatus === "succeeded"
        ? "Updated Successfully"
        : "Update Book"}
    </button>
  );
};

export default UpdateBookBtn;
