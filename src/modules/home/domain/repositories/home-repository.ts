import { TransactionType } from "@/src/models/shared";
import { IHomeChartData, IHomeTransaction } from "../entries/home";

export interface IHomeRepository {
  getBalance(transactions: IHomeTransaction[]): number;
  getTransactions(userId: string): Promise<IHomeTransaction[]>;
  getLastTransactions(transactions: IHomeTransaction[]): IHomeTransaction[];
  getChartData(
    type: Omit<TransactionType, "all">,
    transactions: IHomeTransaction[],
  ): IHomeChartData;
}
