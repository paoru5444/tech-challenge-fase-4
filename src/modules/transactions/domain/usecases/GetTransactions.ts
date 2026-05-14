import { ITransactionRepository } from "../repositories/transaction-repository";

export class GetTransactions {
  constructor(private repository: ITransactionRepository) {}

  async execute(userId: string) {
    return await this.repository.getTransactions(userId);
  }
}
