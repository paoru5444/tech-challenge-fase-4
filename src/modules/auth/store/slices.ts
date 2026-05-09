import { combineSlices, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../domain/entities/user";
import { signIn, signUp } from "./actions";

export interface AuthState {
  user: IUser | null;
  isAuthenticated?: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        console.log("state.isAuthenticated: ", state.isAuthenticated);
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message || "Falha ao autenticar usuário.";
      });
  },
});

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message || "Falha ao criar usuário.";
      });
  },
});

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Falha ao encerrar a sessão.";
      });
  },
});

export const authenticatorReducer = combineSlices(
  signInSlice,
  signUpSlice,
  logoutSlice,
);
