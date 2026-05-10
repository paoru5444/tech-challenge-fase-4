import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { container } from "../di/container";
import { TransactionType } from "@/src/models/shared";
import { IHomeTransaction } from "../domain/entries/home";

export const getTransactions = createAsyncThunk(
  "home/getTransactions",
  async (userId: string) => {
    return await container.getTransactions.execute(userId);
  },
);

export const getChartData = createAsyncThunk(
  "home/getChartData",
  async ({
    selectedType,
    transactions,
  }: {
    selectedType: Omit<TransactionType, "all">;
    transactions: IHomeTransaction[];
  }) => {
    console.log("selectedType", selectedType);
    return await container.getChartData.execute(selectedType, transactions);
  },
);

export const getBalance = createAsyncThunk(
  "home/getBalance",
  async (transactions: IHomeTransaction[]) => {
    return await container.getBalance.execute(transactions);
  },
);

export const getLastTransactions = createAsyncThunk(
  "home/getLastTransactions",
  async (transactions: IHomeTransaction[]) => {
    return await container.getLastTransactions.execute(transactions);
  },
);
