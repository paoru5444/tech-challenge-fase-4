import { IHomeTransaction } from "../entries/home";
import { IHomeRepository } from "../repositories/home-repository";

export class GetBalance {
  constructor(private repository: IHomeRepository) {}

  async execute(transactions: IHomeTransaction[]) {
    return this.repository.getBalance(transactions);
  }
}
