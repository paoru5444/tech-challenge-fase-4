import { FormDataProps } from "@/src/models/shared";
import { ITransactionRepository } from "../repositories/transaction-repository";

export class AddTransactions {
  constructor(private repository: ITransactionRepository) {}

  async execute(userId: string, formData: FormDataProps) {
    return await this.repository.addTransactions(userId, formData);
  }
}
