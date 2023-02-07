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
    authenticationModalOpen: false,
    loginStatus: "idle",
    socialSignInStatus: "idle",
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
    openAuthenticationModal: (state) => {
      state.authenticationModalOpen = true;
    },
    closeAuthenticationModal: (state) => {
      state.authenticationModalOpen = false;
    },
    resetLoginState: (state) => {
      if (state.loginStatus !== "idle") {
        state.loginStatus = "idle";
      }
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
        state.authenticationModalOpen = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
      })

      .addCase(socialSignIn.pending, (state, action) => {
        state.socialSignInStatus = "loading";
      })
      .addCase(socialSignIn.fulfilled, (state, action) => {
        state.socialSignInStatus = "succeeded";
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authenticationModalOpen = false;
      })
      .addCase(socialSignIn.rejected, (state, action) => {
        state.socialSignInStatus = "failed";
      });
  },
});

const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
const selectLoginStatus = (state: RootState) => state.user.loginStatus;
const selectSocialSignInStatus = (state: RootState) =>
  state.user.socialSignInStatus;

export { selectIsLoggedIn, selectLoginStatus, selectSocialSignInStatus };

export { loginUser, socialSignIn };

export const {
  logoutUser,
  openAuthenticationModal,
  closeAuthenticationModal,
  resetLoginState,
} = userSlice.actions;

export default userSlice.reducer;
