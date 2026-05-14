import { FirebaseFirestore } from "../../data/remote/firebase-firestore";
import { ITransaction } from "../entities/transaction";
import { ITransactionListRepository } from "./transaction-list-repository";

export class TransactionListRepositoryImpl implements ITransactionListRepository {
  constructor(private remote: FirebaseFirestore) {}

  getTransactionsYearsAndMonths(transactions: ITransaction[]) {
    const months = Array.from(
      new Set(transactions.map((t) => t.date.split("-")[1]).sort()),
    );
    const years = Array.from(
      new Set(transactions.map((t) => t.date.split("-")[0]).sort()),
    );
    return { years, months };
  }

  async filterTransactions(
    userId: string,
    year: string,
    month: string,
    category: string,
    perScroll: number,
  ): Promise<ITransaction[]> {
    return this.remote.filterTransactions(
      userId,
      year,
      month,
      category,
      perScroll,
    );
  }
}
