import React from "react";
import { useDispatch } from "react-redux";
import { openAuthenticationModal } from "../../features/user/userSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="text-xs px-2 py-1 border-2 border-slate-600 rounded-lg w-fit"
      onClick={() => dispatch(openAuthenticationModal())}
    >
      <div>Logout</div>
    </button>
  );
};

export default LogoutBtn;
