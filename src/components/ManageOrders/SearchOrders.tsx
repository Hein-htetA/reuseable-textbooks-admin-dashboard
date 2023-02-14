import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
  fetchOrders,
  SelectOrderStatus,
} from "../../features/order/orderSlice";

const SearchOrders = () => {
  const [formValues, setFormValues] = useState({
    start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    end: new Date().toISOString().split("T")[0],
    status: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const orderStatus = useSelector(SelectOrderStatus);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2 justify-between items-center mb-1 max-w-md w-full">
        <div className="flex items-center gap-1">
          <label htmlFor="start" className="font-bold">
            Start
          </label>
          <input
            type="date"
            name="start"
            className="border-2 border-slate-500 p-1 rounded-lg w-28 text-xs outline-none"
            value={formValues.start}
            onChange={onChangeInput}
          />
        </div>
        <div className="flex items-center gap-1">
          <label htmlFor="end" className="font-bold">
            End
          </label>
          <input
            type="date"
            name="end"
            className="border-2 border-slate-500 p-1 w-28 rounded-lg text-xs outline-none"
            value={formValues.end}
            onChange={onChangeInput}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center mb-1 max-w-md w-full text-sm">
        <div className="flex items-center gap-1 text-red-500 font-bold">
          <input
            type="radio"
            id="canceled"
            name="status"
            value={"canceled"}
            checked={formValues.status === "canceled"}
            onChange={onChangeInput}
          />
          <label htmlFor="canceled">Canceled</label>
        </div>

        <div className="flex items-center gap-1 text-pink-500 font-bold">
          <input
            type="radio"
            id="pending"
            name="status"
            value={"pending"}
            checked={formValues.status === "pending"}
            onChange={onChangeInput}
          />
          <label htmlFor="pending">Pending</label>
        </div>

        <div className="flex items-center gap-1 text-green-500 font-bold">
          <input
            type="radio"
            id="completed"
            name="status"
            value={"completed"}
            checked={formValues.status === "completed"}
            onChange={onChangeInput}
          />
          <label htmlFor="completed">Completed</label>
        </div>
        <div className="flex items-center gap-1 font-bold">
          <input
            type="radio"
            id="any"
            name="status"
            value={""}
            checked={formValues.status === ""}
            onChange={onChangeInput}
          />
          <label htmlFor="any">ALL</label>
        </div>
      </div>
      <div className="flex gap-2 justify-end items-center mb-1 max-w-md w-full">
        <button
          className="w-40 bg-slate-500 text-white rounded-lg self-end py-1 text-sm disabled:bg-slate-400"
          onClick={() => dispatch(fetchOrders(formValues))}
          disabled={orderStatus === "loading"}
        >
          {orderStatus === "loading"
            ? "LOADING"
            : orderStatus === "failed"
            ? "TRY AGAIN"
            : "LOAD"}
        </button>
      </div>
      <div className="w-full h-[1px] bg-slate-500 my-3 "></div>
    </div>
  );
};

export default SearchOrders;
