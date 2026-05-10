import { createAsyncThunk } from "@reduxjs/toolkit";
import { container } from "../di/container";
import { IUserCredentials } from "../domain/entities/user";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: IUserCredentials) => {
    return await container.signIn.execute(credentials);
  },
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (crendentials: IUserCredentials) => {
    return await container.signUp.execute(crendentials);
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await container.logout.execute();
});
