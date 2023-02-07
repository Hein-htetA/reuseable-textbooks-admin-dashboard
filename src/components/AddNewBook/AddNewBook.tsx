import React from "react";
import AddNewBookBtn from "./AddNewBookBtn";

const AddNewBook = () => {
  return (
    <div className="flex flex-col p-5 gap-3 text-sm">
      <h1 className="text-center text-lg px-3 mb-3 py-2 border-2 border-slate-500 rounded-xl">
        Add A New Book
      </h1>
      <div className="grid grid-cols-[auto_1fr] gap-x-1">
        <div>Title - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="Enter Book Title"
        />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-1">
        <div>Author - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="Enter Author Name"
        />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-1">
        <div>Chapters - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="1,2,3,4,5"
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1">
        <div>Owner Name - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="Enter Last Owner's Name"
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1">
        <div>Owner Roll No - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="Enter Last Owner's Roll Number"
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1">
        <div>Price - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="Enter Price"
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1">
        <div>Edition - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="Twelveth Edition"
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1">
        <div>Amount In Stock - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="Enter Available Stock"
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1">
        <div>Department - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="McE, Mech, EP, C"
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1">
        <div>Year - </div>
        <input
          className="px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          placeholder="1,2,3"
        />
      </div>
      <AddNewBookBtn />
    </div>
  );
};

export default AddNewBook;
