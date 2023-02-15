import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { baseUrl } from "../../url";

interface loginFormValues {
  email: string;
  password: string;
}

const initializeFun = () => {
  let isLoggedIn = false;
  const token = sessionStorage.getItem("token") || "";

  if (token) {
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    isLoggedIn = true;

    if (new Date().getTime() > jwtPayload.exp * 1000) {
      //token is expire
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      isLoggedIn = false;
    }
  }

  return {
    token,
    isLoggedIn,
    loginStatus: "idle",
  };
};

const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formValues: loginFormValues, { rejectWithValue }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    try {
      const response = await fetch(`${baseUrl}/auth/login`, requestOptions);
      if (!response.ok) {
        throw new Error();
      }
      const { token } = await response.json();
      sessionStorage.setItem("token", token);
      return { token };
    } catch (error) {
      throw rejectWithValue("");
    }
  }
);

const socialSignIn = createAsyncThunk(
  "user/socialSignIn",
  async (socialToken: string, { rejectWithValue }) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ socialToken }),
    };

    try {
      const response = await fetch(
        `${baseUrl}/auth/socialSignIn`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error();
      }
      const { token } = await response.json();
      sessionStorage.setItem("token", token);
      return { token };
    } catch (error) {
      throw rejectWithValue("");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initializeFun,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
      });
  },
});

const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
const selectLoginStatus = (state: RootState) => state.user.loginStatus;

export { selectIsLoggedIn, selectLoginStatus };

export { loginUser, socialSignIn };

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
