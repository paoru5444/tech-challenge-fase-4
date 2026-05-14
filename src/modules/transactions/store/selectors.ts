import { RootState } from "@/src/store";

export const selectTransactions = (state: RootState) =>
  state.transaction.transactions;

export const selectFilterMonths = (state: RootState) =>
  state.transaction.months;

export const selectFilterYears = (state: RootState) => state.transaction.years;

export const selectIsLoading = (state: RootState) =>
  state.transaction.status === "loading";

export const selectTransactionFormDataDate = (state: RootState) =>
  state.transaction.transactionFormDataDate;

export const selectTransactionFormDataCategory = (state: RootState) =>
  state.transaction.transactionFormDataCategory;
