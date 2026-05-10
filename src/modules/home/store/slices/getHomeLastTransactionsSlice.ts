import { createSlice } from "@reduxjs/toolkit";
import { IHomeTransaction } from "../../domain/entries/home";
import { getLastTransactions, getTransactions } from "../actions";
import { ReducerStatus } from "@/src/models/shared";

export interface HomeLastTransactionState {
  lastTransactions: IHomeTransaction[];
  status: ReducerStatus;
  error: string | null;
}

const homeLastTransactionsInitialState: HomeLastTransactionState = {
  lastTransactions: [],
  status: "idle",
  error: null,
};

export const getHomeLastTransactionsSlice = createSlice({
  name: "lastTransactions",
  initialState: homeLastTransactionsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLastTransactions.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.lastTransactions = action.payload;
    });
  },
});
