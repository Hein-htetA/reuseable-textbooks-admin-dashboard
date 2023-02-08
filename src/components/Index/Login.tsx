import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { loginUser, selectLoginStatus } from "../../features/user/userSlice";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const loginStatus = useSelector(selectLoginStatus);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <div>Email </div>
        <input
          className={
            "px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          }
          placeholder="Enter Admin Email"
          name="email"
          value={formValues.email}
          onChange={onChangeInput}
        />
      </div>
      <div className="flex flex-col">
        <div>Password </div>
        <input
          className={
            "px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full"
          }
          placeholder="Enter Admin Password"
          name="password"
          value={formValues.password}
          onChange={onChangeInput}
        />
      </div>
      <button
        className="p-2 bg-slate-600 text-white rounded-lg"
        onClick={() => dispatch(loginUser(formValues))}
      >
        {loginStatus === "loading"
          ? "LOGIN..."
          : loginStatus === "failed"
          ? "TRY AGAIN"
          : "LOGIN"}
      </button>
    </div>
  );
};

export default Login;
