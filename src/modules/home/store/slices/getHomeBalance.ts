import { createSlice } from "@reduxjs/toolkit";
import { getBalance } from "../actions";

export interface HomeBalanceState {
  balance: number;
}

const initialState: HomeBalanceState = {
  balance: 0,
};

export const getHomeBalanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
  },
});
