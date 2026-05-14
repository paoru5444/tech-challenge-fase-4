import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { ITransaction } from "../domain/entities/transaction";
import {
  addTransaction,
  deleteTransaction,
  filterTransactions,
  getTransactions,
  getTransactionsYearsAndMonths,
  updateTransaction,
} from "./actions";
import { ReducerStatus } from "@/src/models/shared";

interface TransactionsState {
  transactions: ITransaction[];
  status: ReducerStatus;
  error: string | null;
  months: string[];
  years: string[];
  transactionFormDataCategory: {
    key: string;
    value: string;
  };
  transactionFormDataDate: string;
  transactionFormData:
    | {
        amount: string;
        description: string;
        date: string;
        category: {
          key: string;
          value: string;
        };
      }
    | {};
}

const initialState: TransactionsState = {
  transactions: [],
  status: "idle",
  error: null,
  months: [],
  years: [],
  transactionFormDataDate: "",
  transactionFormDataCategory: {
    key: "",
    value: "",
  },
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactionFormDataDate(state, action) {
      state.transactionFormDataDate = action.payload;
    },
    setTransactionFormDataCategory(state, action) {
      state.transactionFormDataCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload ?? [];
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const idx = state.transactions.findIndex(
          (t) => t.id === action.payload.id,
        );
        if (idx !== -1) state.transactions[idx] = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload,
        );
      })
      .addCase(filterTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload ?? [];
      })
      .addCase(getTransactionsYearsAndMonths.fulfilled, (state, action) => {
        state.months = action.payload.months ?? [];
        state.years = action.payload.years ?? [];
      })
      // ── Pending: QUALQUER thunk deste slice → loading ──
      .addMatcher(
        isPending(
          getTransactions,
          addTransaction,
          updateTransaction,
          deleteTransaction,
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        },
      )
      // ── Rejected: QUALQUER thunk deste slice → error ──
      .addMatcher(
        isRejected(
          getTransactions,
          addTransaction,
          updateTransaction,
          deleteTransaction,
        ),
        (state, action) => {
          state.status = "failed";
          state.error = (action.payload as string) ?? "Erro inesperado.";
        },
      )
      // ── Fulfilled genérico: status succeeded pra todos ──
      .addMatcher(
        isFulfilled(
          getTransactions,
          addTransaction,
          updateTransaction,
          deleteTransaction,
        ),
        (state) => {
          state.status = "succeeded";
        },
      );
  },
});

export const transactionReducer = transactionsSlice.reducer;
