import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { baseUrl } from "../../url";

interface FormValues {
  start: string;
  end: string;
  status: string;
}

interface InitialState {
  orders: any[];
  orderStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: InitialState = {
  orders: [],
  orderStatus: "idle",
};

const fetchOrders = createAsyncThunk<
  any,
  FormValues,
  { state: RootState; rejectValue: string }
>("order/fetchOrders", async (formValues, { getState, rejectWithValue }) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.token}`,
    },
  };

  try {
    const start = new Date(formValues.start).toISOString();
    const endInMs = new Date(formValues.end).getTime();
    const end = new Date(endInMs + 24 * 60 * 60 * 1000).toISOString();
    const status = formValues.status;

    const response = await fetch(
      `${baseUrl}/order/admin?start=${start}&end=${end}&status=${status}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error();
    }
    const { orders } = await response.json();
    const ordersWithUpdateStatus = orders.map((order: any) => ({
      ...order,
      updateStatus: "idle",
    }));
    return ordersWithUpdateStatus;
  } catch (error) {
    return rejectWithValue("");
  }
});

const updateOrder = createAsyncThunk<
  any,
  {
    orderId: string;
    status: string;
  },
  { state: RootState; rejectValue: string }
>("order/updateOrder", async (params, { rejectWithValue, getState }) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.token}`,
    },
    body: JSON.stringify(params),
  };
  try {
    const response = await fetch(`${baseUrl}/order`, requestOptions);
    if (!response.ok) {
      throw new Error();
    }
    const { updatedOrder } = await response.json();
    return updatedOrder;
  } catch (error) {
    return rejectWithValue("");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.orderStatus = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderStatus = "failed";
      })

      .addCase(updateOrder.pending, (state, action) => {
        const { orderId } = action.meta.arg;
        const index = state.orders.findIndex((order) => order._id === orderId);
        state.orders[index].updateStatus = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const { orderId, status } = action.meta.arg;
        const index = state.orders.findIndex((order) => order._id === orderId);
        state.orders[index].updateStatus = "succeeded";
        state.orders[index].status = status;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        const { orderId } = action.meta.arg;
        const index = state.orders.findIndex((order) => order._id === orderId);
        state.orders[index].updateStatus = "failed";
      });
  },
});

const SelectOrderStatus = (state: RootState) => state.order.orderStatus;
const SelectOrders = (state: RootState) => state.order.orders;

export { SelectOrderStatus, SelectOrders };

export { fetchOrders, updateOrder };

export default orderSlice.reducer;
