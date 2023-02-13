import React from "react";

const ManageOrders = () => {
  return (
    <div className="p-5 flex flex-col gap-2 items-center">
      <div className="flex gap-2 justify-between items-center mb-1 max-w-md w-full">
        <div className="flex items-center gap-1">
          <label htmlFor="start" className="font-bold">
            Start
          </label>
          <input
            type="date"
            name="start"
            className="border-2 border-slate-500 px-2 rounded-lg mr-2 text-xs"
          />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="end" className="font-bold">
            End
          </label>
          <input
            type="date"
            name="end"
            className="border-2 border-slate-500 px-2 rounded-lg text-xs"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center mb-1 max-w-md w-full text-sm">
        <div className="flex items-center gap-1 text-red-500 font-bold">
          <input type="radio" id="canceled" name="status" checked />
          <label htmlFor="status">Canceled</label>
        </div>

        <div className="flex items-center gap-1 text-pink-500 font-bold">
          <input type="radio" id="pending" name="status" />
          <label htmlFor="pending">Pending</label>
        </div>

        <div className="flex items-center gap-1 text-green-500 font-bold">
          <input type="radio" id="completed" name="status" />
          <label htmlFor="completed">Completed</label>
        </div>
      </div>
      <div className="flex gap-2 justify-end items-center mb-1 max-w-md w-full">
        <button className="w-40 bg-slate-500 text-white rounded-lg self-end py-1 text-sm">
          LOAD
        </button>
      </div>
      <div className="w-full h-[1px] bg-slate-500 my-3 "></div>
    </div>
  );
};

export default ManageOrders;
