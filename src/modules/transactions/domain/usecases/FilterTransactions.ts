import { ITransactionListRepository } from "../repositories/transaction-list-repository";

export class FilterTransactions {
  constructor(private repository: ITransactionListRepository) {}

  async execute(
    userId: string,
    years: string,
    month: string,
    category: string,
    perScroll: number,
  ) {
    return this.repository.filterTransactions(
      userId,
      years,
      month,
      category,
      perScroll,
    );
  }
}
