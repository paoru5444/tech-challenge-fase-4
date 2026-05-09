import { RootState } from "@/src/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state: RootState) => {
  const { signIn, signUp } = state.user;
  return signIn.user || signUp.user;
};

export const selectIsAuthenticated = (state: RootState) => {
  const { signIn, signUp } = state.user;
  console.log("signIn", state.user.signIn);
  return signIn.isAuthenticated || signUp.isAuthenticated;
};

export const selectSignInStatus = (state: RootState) =>
  state.user.signIn.status;
export const selectSignInError = (state: RootState) => state.user.signIn.error;

export const selectSignUpStatus = (state: RootState) =>
  state.user.signUp.status;
export const selectSignUpError = (state: RootState) => state.user.signUp.error;

export const selectLogoutStatus = (state: RootState) =>
  state.user.logout.status;
export const selectLogoutError = (state: RootState) => state.user.logout.error;

export const isSignInProgress = createSelector(
  [selectSignInStatus],
  (signInStatus) => signInStatus === "loading",
);

export const isSignUpInProgress = createSelector(
  [selectSignInStatus],
  (signInStatus) => signInStatus === "loading",
);
