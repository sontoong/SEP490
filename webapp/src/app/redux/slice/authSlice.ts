import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../utils/agent";
import { AxiosError } from "axios";
import { User } from "../../models/user";
// import { jwtDecode } from "jwt-decode";
import { excludedActionsPending } from "./specialUISlice";

const token = localStorage.getItem("access_token");
let initUser = {};
if (token && token !== "undefined") {
  // initUser = jwtDecode(token);
  initUser = {
    Role: "2",
    AccountId: "1",
    AvatarUrl: "",
    DateOfBirth: "",
    DisabledReason: "",
    Email: "admin@gmail.com",
    Fullname: "abc",
    IsDisabled: false,
    PhoneNumber: "13333333333",
  };
} else {
  localStorage.clear();
}

export type TAuth = {
  currentUser: User;
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TAuth = {
  currentUser: initUser as User,
  isFetching: false,
  isSending: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<TAuth["currentUser"]>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/fetch/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return {
            ...initialState,
            isFetching: true,
          };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/send/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        (state) => {
          return { ...state, isSending: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/send/") &&
          action.type.endsWith("/fulfilled"),
        () => {
          return { ...initialState };
        },
      );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("auth/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
        state.isSending = false;
      },
    );
  },
});

export const login = createAsyncThunk<any, LoginParams>(
  "auth/send/login",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await agent.Auth.login({
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);
export const { setCurrentUser } = authSlice.actions;

export const isLoggedIn = () => {
  return !!localStorage.getItem("access_token");
};

export default authSlice.reducer;

export type LoginParams = {
  email: string;
  password: string;
};
