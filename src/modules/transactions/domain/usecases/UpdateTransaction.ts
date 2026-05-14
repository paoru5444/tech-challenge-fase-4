import { FormDataProps } from "@/src/models/shared";
import { ITransactionRepository } from "../repositories/transaction-repository";

export class UpdateTransaction {
  constructor(private repository: ITransactionRepository) {}

  async execute(
    userId: string,
    transactionId: string,
    formData: FormDataProps,
  ) {
    return await this.repository.updateTransaction(
      userId,
      transactionId,
      formData,
    );
  }
}
