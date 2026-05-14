import { ITransactionListRepository } from "../repositories/transaction-list-repository";
import { ITransaction } from "../entities/transaction";

export class GetTransactionsYearsAndMonths {
  constructor(private repository: ITransactionListRepository) {}

  async execute(transactions: ITransaction[]) {
    return this.repository.getTransactionsYearsAndMonths(transactions);
  }
}
