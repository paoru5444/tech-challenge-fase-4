import { ITransactionRepository } from "../repositories/transaction-repository";

export class DeleteTransaction {
  constructor(private repository: ITransactionRepository) {}

  async execute(userId: string, transactionId: string) {
    return await this.repository.deleteTransaction(userId, transactionId);
  }
}
