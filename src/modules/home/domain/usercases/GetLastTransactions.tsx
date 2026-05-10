import { IHomeTransaction } from "../entries/home";
import { IHomeRepository } from "../repositories/home-repository";

export class GetLastTransactions {
  constructor(private repository: IHomeRepository) {}

  async execute(transactions: IHomeTransaction[]) {
    return this.repository.getLastTransactions(transactions);
  }
}
