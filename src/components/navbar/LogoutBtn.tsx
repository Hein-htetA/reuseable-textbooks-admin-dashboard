import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="text-xs px-2 py-1 border-2 border-slate-600 rounded-lg w-fit"
      onClick={() => dispatch(logoutUser())}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
