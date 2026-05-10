import { RootState } from "@/src/store";

export const selectHomeTransactions = (state: RootState) =>
  state.home.transaction.transactions;

export const selectHomeTransactionsLoading = (state: RootState) =>
  state.home.transaction.status === "loading";

export const selectHomeLastTransactions = (state: RootState) =>
  state.home.lastTransactions.lastTransactions;

export const selectHomeChartData = (state: RootState) =>
  state.home.chartData.chartData;

export const selectSelectedType = (state: RootState) =>
  state.home.chartData.selectedType;

export const selectBalance = (state: RootState) => state.home.balance.balance;
