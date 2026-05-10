import { TransactionType } from "@/src/models/shared";
import { IHomeRepository } from "../repositories/home-repository";
import { IHomeTransaction } from "../entries/home";

export class GetChartData {
  constructor(private repository: IHomeRepository) {}

  async execute(
    type: Omit<TransactionType, "all">,
    transactions: IHomeTransaction[],
  ) {
    return this.repository.getChartData(type, transactions);
  }
}
