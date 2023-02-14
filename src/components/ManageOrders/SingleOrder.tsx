import React, { useState, useEffect } from "react";
import SingleBook from "./SingleBook";
import { FaRegCopy } from "react-icons/fa";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { ImSpinner9, ImSpinner11 } from "react-icons/im";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { updateOrder } from "../../features/order/orderSlice";

interface Props {
  _id: string;
  books: any;
  orderId: string;
  status: string;
  date: string;
  totalAmount: number;
  customerName: string;
  phone: string;
  facebook: string;
  viber: string;
  telegram: string;
  updateStatus: string;
}

const canceledClass =
  "p-1 outline-none border-2 border-red-500 rounded-lg bg-white text-red-500";
const pendingClass =
  "p-1 outline-none border-2 border-pink-500 rounded-lg bg-white text-pink-500";
const completedClass =
  "p-1 outline-none border-2 border-green-600 rounded-lg bg-white text-green-500";

const SingleOrder = ({
  _id,
  books,
  orderId,
  status,
  date,
  totalAmount,
  customerName,
  phone,
  facebook,
  viber,
  telegram,
  updateStatus,
}: Props) => {
  const [copied, setCopied] = useState({
    phone: false,
    facebook: false,
    telegram: false,
    viber: false,
  });

  const [select, setSelect] = useState(status);

  const dispatch = useDispatch<AppDispatch>();

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
    dispatch(updateOrder({ orderId: _id, status: select }));
  };

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopied({
      phone: false,
      facebook: false,
      telegram: false,
      viber: false,
      [field]: true,
    });
  };

  useEffect(() => {
    if (updateStatus === "failed") {
      setSelect(status);
    }
  }, [status, updateStatus]);

  return (
    <div className="max-w-3xl w-full mx-auto border-2 border-slate-500 px-4 py-3 rounded-xl text-sm">
      <div className="mx-auto w-fit">OrderId: {orderId}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center my-4">
        <div className="flex items-center gap-2">
          <label htmlFor="statusSelect">Status: </label>

          <select
            name="status"
            id="statusSelect"
            className={
              select === "canceled"
                ? canceledClass
                : select === "pending"
                ? pendingClass
                : completedClass
            }
            value={select}
            onChange={onChangeSelect}
          >
            <option value="canceled" className="text-red-500">
              Canceled
            </option>
            <option value="pending" className="text-pink-500">
              Pending
            </option>
            <option value="completed" className="text-green-600">
              Completed
            </option>
          </select>
          <div className="text-xl">
            {updateStatus === "loading" ? (
              <ImSpinner9 className="text-slate-500 animate-spin" />
            ) : updateStatus === "failed" ? (
              <ImSpinner11
                className="text-red-600"
                onClick={() =>
                  dispatch(updateOrder({ orderId: _id, status: select }))
                }
              />
            ) : updateStatus === "succeeded" ? (
              <IoMdCheckmarkCircleOutline className="text-green-600" />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          Date:
          <span className="ml-1">{new Date(date).toLocaleString()}</span>
        </div>
      </div>

      <div className="h-[1px] bg-slate-500 mb-2"></div>

      <div className="mx-auto w-fit capitalize font-bold">{customerName}</div>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex gap-2 items-center overflow-x-auto">
          <div>Phone:</div>
          {phone && (
            <button
              onClick={() => handleCopy(phone, "phone")}
              className="text-base -mr-2"
            >
              {copied.phone ? (
                <BsFileEarmarkCheck className="text-green-700 text-lg" />
              ) : (
                <FaRegCopy className="text-slate-500 text-lg" />
              )}
            </button>
          )}
          <div>{phone}</div>
        </div>
        <div className="flex gap-2 items-center overflow-x-auto">
          <div>Viber:</div>
          {viber && (
            <button
              onClick={() => handleCopy(viber, "viber")}
              className="text-base text-slate-500 -mr-2"
            >
              {copied.viber ? (
                <BsFileEarmarkCheck className="text-green-700 text-lg" />
              ) : (
                <FaRegCopy className="text-slate-500 text-lg" />
              )}
            </button>
          )}
          <div>{viber}</div>
        </div>
        <div className="flex gap-2 items-center overflow-x-auto">
          <div>Telegram:</div>
          {telegram && (
            <button
              onClick={() => handleCopy(telegram, "telegram")}
              className="text-base text-slate-500 -mr-2"
            >
              {copied.telegram ? (
                <BsFileEarmarkCheck className="text-green-700 text-lg" />
              ) : (
                <FaRegCopy className="text-slate-500 text-lg" />
              )}
            </button>
          )}
          <div>{telegram}</div>
        </div>
        <div className="flex gap-2 items-center overflow-x-auto">
          <div>Facebook:</div>
          {facebook && (
            <button
              onClick={() => handleCopy(facebook, "facebook")}
              className="text-base text-slate-500 -mr-2"
            >
              {copied.facebook ? (
                <BsFileEarmarkCheck className="text-green-700 text-lg" />
              ) : (
                <FaRegCopy className="text-slate-500 text-lg" />
              )}
            </button>
          )}
          <div>{facebook}</div>
        </div>
      </div>

      <div className="h-[1px] bg-slate-500 my-2"></div>

      <SingleBook books={books} />
      <div className="h-[1px] bg-slate-500 mb-2"></div>
      <div className="w-fit ml-auto">
        Total:
        <span className="font-bold text-slate-700 ml-1">{totalAmount}</span>
        Kyats
      </div>
    </div>
  );
};

export default SingleOrder;
