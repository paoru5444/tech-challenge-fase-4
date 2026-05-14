import { FormDataProps } from "@/src/models/shared";
import { FirebaseFirestore } from "../../data/remote/firebase-firestore";
import { ITransaction } from "../entities/transaction";
import { ITransactionRepository } from "./transaction-repository";

export class TransactionRepositoryImpl implements ITransactionRepository {
  constructor(private remote: FirebaseFirestore) {}

  getTransactions(userId: string) {
    return this.remote.getTransactions(userId);
  }

  addTransactions(userId: string, transaction: ITransaction) {
    return this.remote.addTransactions(userId, transaction);
  }

  updateTransaction(
    userId: string,
    transactionId: string,
    formData: FormDataProps,
  ) {
    return this.remote.updateTransaction(userId, transactionId, formData );
  }

  deleteTransaction(userId: string, transactionId: string) {
    return this.remote.deleteTransaction(userId, transactionId);
  }
}
