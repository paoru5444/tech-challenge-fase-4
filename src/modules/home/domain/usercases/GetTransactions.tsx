import { IHomeRepository } from "../repositories/home-repository";

export class GetTransactions {
  constructor(private repository: IHomeRepository) {}

  async execute(userId: string) {
    return this.repository.getTransactions(userId);
  }
}
