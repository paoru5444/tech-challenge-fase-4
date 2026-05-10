import { createSlice } from "@reduxjs/toolkit";
import { IHomeTransaction } from "../../domain/entries/home";
import { getTransactions } from "../actions";
import { ReducerStatus } from "@/src/models/shared";

export interface HomeTransactionState {
  transactions: IHomeTransaction[];
  status: ReducerStatus;
  error: string | null;
}

const homeTransactionsInitialState: HomeTransactionState = {
  transactions: [],
  status: "idle",
  error: null,
};

export const getHomeTransactionsSlice = createSlice({
  name: "transaction",
  initialState: homeTransactionsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getTransactions.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.transactions = action.payload;
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Falha ao buscar as transações.";
    });
  },
});
