import { TransactionType } from "@/src/models/shared";
import { FirebaseFirestore } from "../../data/remote/firebase-firestore";
import {
  getTransactionMonths,
  IHomeChartData,
  IHomeTransaction,
} from "../entries/home";
import { IHomeRepository } from "./home-repository";
import { monthNames } from "@/src/constants/info";

export class HomeRepositoryImpl implements IHomeRepository {
  constructor(private remote: FirebaseFirestore) {}

  getBalance(transactions: IHomeTransaction[]): number {
    const balance = transactions
      .reduce((acc, item) => {
        if (!item.amount) {
          return acc;
        }

        if (item.type !== "deposit") {
          return acc - parseFloat(item.amount);
        }

        return acc + parseFloat(item.amount);
      }, 0)
      .toFixed(2);

    return parseFloat(balance);
  }

  getTransactions(userId: string): Promise<IHomeTransaction[]> {
    return this.remote.getTransactions(userId);
  }

  getLastTransactions(transactions: IHomeTransaction[]): IHomeTransaction[] {
    return transactions.slice(0, 3);
  }

  getChartData(
    type: Omit<TransactionType, "all">,
    transactions: IHomeTransaction[],
  ): IHomeChartData {
    const months = getTransactionMonths(transactions);

    return (
      months.sort().map((month) => {
        const count = transactions.reduce(
          (acc: number, item: IHomeTransaction) => {
            const itemMonth = item.date.split("-")[1];
            const itemAmount = parseFloat(item.amount);
            const hasMatchCategory = item.type === type;

            if (
              itemMonth === month &&
              !!itemAmount &&
              (hasMatchCategory || type === "all")
            ) {
              return acc + itemAmount;
            }

            return acc;
          },
          0,
        );

        return {
          label: monthNames[parseInt(month) - 1],
          value: count,
        };
      }) || []
    );
  }
}
