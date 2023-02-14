import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import bookReducer from "../features/book/bookSlice";
import orderReducer from "../features/order/orderSlice";
import logoutMiddleware from "../features/middleware/logoutMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(logoutMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
