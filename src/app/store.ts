import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import bookReducer from "../features/book/bookSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
