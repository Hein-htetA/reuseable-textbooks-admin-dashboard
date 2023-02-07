import React from "react";

interface Props {
  handleNewBookUpload: () => void;
}

const AddNewBookBtn = ({ handleNewBookUpload }: Props) => {
  return (
    <button
      className="py-2 rounded-xl bg-slate-400 text-white text-base mb-10 tracking-widest"
      onClick={handleNewBookUpload}
    >
      UPLOAD
    </button>
  );
};

export default AddNewBookBtn;
