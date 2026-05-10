import { CategoryType, ChartData, TransactionType } from "@/src/models/shared";

export interface IHomeTransaction {
  amount: string;
  category: CategoryType;
  date: string;
  description: string;
  id: string;
  type: TransactionType;
}

export type IHomeBalance = number;

export type IHomeChartData = ChartData[];

export const getTransactionMonths = (transactions: IHomeTransaction[]) => {
  const months = transactions.map((transaction) => {
    return transaction.date.split("-")[1];
  });

  const monthsSet = new Set(months);

  return Array.from(monthsSet);
};
