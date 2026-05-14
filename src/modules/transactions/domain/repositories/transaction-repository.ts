import { FormDataProps } from "@/src/models/shared";
import { ITransaction } from "../entities/transaction";

export interface ITransactionRepository {
  getTransactions(userId: string): Promise<ITransaction[] | undefined>;
  addTransactions(userId: string, formData: FormDataProps): Promise<ITransaction>;
  deleteTransaction(userId: string, transactionid: string): Promise<void>;
  updateTransaction(
    userId: string,
    transactionid: string,
    formData: FormDataProps,
  ): Promise<ITransaction>;
}
