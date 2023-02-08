import { createListenerMiddleware } from "@reduxjs/toolkit";
import { logoutUser } from "../user/userSlice";

const logoutMiddleware = createListenerMiddleware();

logoutMiddleware.startListening({
  actionCreator: logoutUser,
  effect: () => {
    sessionStorage.removeItem("token");
  },
});

export default logoutMiddleware;
