import React from "react";
import { useSelector } from "react-redux";
import {
  SelectOrders,
  SelectOrderStatus,
} from "../../features/order/orderSlice";
import SingleBook from "../EditExistingBooks/SingleBook";
import SearchOrders from "./SearchOrders";
import SingleOrder from "./SingleOrder";
import { ImSpinner2 } from "react-icons/im";

const ManageOrders = () => {
  const orders = useSelector(SelectOrders);
  const orderStatus = useSelector(SelectOrderStatus);

  return (
    <div className="p-5">
      <SearchOrders />
      <div className="flex flex-col gap-4">
        {orderStatus === "succeeded" && orders.length === 0 && (
          <div className="text-lg font-bold text-center my-10">No Results</div>
        )}
        {orderStatus === "loading" && (
          <div className="my-10 mx-auto w-fit">
            <ImSpinner2 className="animate-spin text-5xl text-slate-500" />
          </div>
        )}
        {orders.map((order) => (
          <SingleOrder
            key={order._id}
            _id={order._id}
            books={order.books}
            status={order.status}
            orderId={order._id}
            date={order.createdAt}
            totalAmount={order.totalAmount}
            customerName={order.customerName}
            facebook={order.facebook}
            viber={order.viber}
            phone={order.phone}
            telegram={order.telegram}
            updateStatus={order.updateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
