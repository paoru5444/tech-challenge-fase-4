import { createAsyncThunk } from "@reduxjs/toolkit";
import { container } from "../di/container";
import { FormDataProps } from "@/src/models/shared";
import { ITransaction } from "../domain/entities/transaction";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (userId: string) => {
    return await container.getTransactions.execute(userId);
  },
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransactions",
  async ({ userId, formData }: { userId: string; formData: FormDataProps }) => {
    return await container.addTransaction.execute(userId, formData);
  },
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransactions",
  async ({
    userId,
    transactionId,
    formData,
  }: {
    userId: string;
    transactionId: string;
    formData: FormDataProps;
  }) => {
    return await container.updateTransaction.execute(
      userId,
      transactionId,
      formData,
    );
  },
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransactions",
  async ({
    userId,
    transactionId,
  }: {
    userId: string;
    transactionId: string;
  }) => {
    await container.deleteTransaction.execute(userId, transactionId);
    return transactionId;
  },
);

export const filterTransactions = createAsyncThunk(
  "transactions/filterTransactions",
  async ({
    userId,
    year,
    month,
    category,
    perScroll,
  }: {
    userId: string;
    year: string;
    month: string;
    category: string;
    perScroll: number;
  }) => {
    return await container.filterTransactions.execute(
      userId,
      year,
      month,
      category,
      perScroll,
    );
  },
);

export const getTransactionsYearsAndMonths = createAsyncThunk(
  "transactions/getTransactionsYearsAndMonths",
  async (transactions: ITransaction[]) => {
    return await container.getTransactionsYearsAndMonths.execute(transactions);
  },
);
