import { ITransaction } from "../entities/transaction";

export interface ITransactionListRepository {
  getTransactionsYearsAndMonths(transactions: ITransaction[]): {
    years: string[];
    months: string[];
  };
  filterTransactions(
    userId: string,
    year: string,
    month: string,
    category: string,
    perScroll: number,
  ): Promise<ITransaction[]>;
}
