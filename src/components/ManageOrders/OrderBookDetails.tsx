import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultBookImg } from "../../url";

const inputClass =
  "px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full capitalize";

const OrderBookDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <div className="flex flex-col gap-3 text-sm p-5">
      <button
        className="my-3 p-3 bg-red-600 w-fit text-white rounded-full text-xl"
        onClick={() => navigate(-1)}
      >
        {"<---"}
      </button>
      <img
        src={state.bookPhotoUrl || defaultBookImg}
        alt="uploadImg"
        className="w-40 rounded-lg aspect-[3/4] mx-auto object-cover"
      />
      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-center">
        <div>Title - </div>
        <input
          className={inputClass}
          placeholder="Enter Book Title"
          name="title"
          value={state.title}
          readOnly
        />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-center">
        <div>Author - </div>
        <input
          className={inputClass}
          placeholder="Enter Author Name"
          name="author"
          value={state.author}
          readOnly
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Edition - </div>
        <input
          className={inputClass}
          placeholder="Twelveth Edition"
          name="edition"
          value={state.edition}
          readOnly
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Price - </div>
        <input
          className={inputClass}
          placeholder="Enter Price"
          name="price"
          value={state.price}
          readOnly
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Year - </div>
        <input
          className={inputClass}
          placeholder="1,2,3"
          name="year"
          value={state.year}
          readOnly
        />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-center">
        <div>Chapters - </div>
        <input
          className={inputClass}
          placeholder="1,2,3,4,5"
          name="availableChapters"
          value={state.availableChapters}
          readOnly
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Departments - </div>
        <input
          className={inputClass}
          placeholder="McE, Mech, EP, C"
          name="departments"
          value={state.departments}
          readOnly
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Owner Name - </div>
        <input
          className={inputClass}
          placeholder="Enter Last Owner's Name"
          name="lastOwnerName"
          value={state.lastOwnerName}
          readOnly
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Owner Roll No - </div>
        <input
          className={inputClass}
          placeholder="Enter Last Owner's Roll Number"
          name="lastOwnerRollNo"
          value={state.lastOwnerRollNo}
          readOnly
        />
      </div>

      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Amount In Stock - </div>
        <input
          className={inputClass}
          placeholder="Enter Available Stock"
          name="amountInStock"
          value={state.amountInStock}
          readOnly
        />
      </div>
    </div>
  );
};

export default OrderBookDetails;
