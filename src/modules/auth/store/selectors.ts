import { RootState } from "@/src/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state: RootState) => state.user.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export const selectStatus = (state: RootState) => state.user.status;
export const selectError = (state: RootState) => state.user.error;

export const isSignInProgress = createSelector(
  [selectStatus],
  (status) => status === "loading",
);

export const isSignUpInProgress = createSelector(
  [selectStatus],
  (status) => status === "loading",
);
