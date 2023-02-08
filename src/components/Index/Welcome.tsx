import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../features/user/userSlice";
import Login from "./Login";
import LoginSuccessfully from "./LoginSuccessfully";

const Welcome = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className="flex flex-col max-w-lg mx-auto">
      <div className=" my-6 p-5 border-2 border-slate-500 rounded-lg gap-6">
        <div className="text-center text-lg">
          <div>Welcome to the admin dashboard</div>
        </div>
      </div>
      {isLoggedIn ? <LoginSuccessfully /> : <Login />}
    </div>
  );
};

export default Welcome;
