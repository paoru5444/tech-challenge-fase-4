import { FirebaseFirestore } from "../data/remote/firebase-firestore";
import { TransactionListRepositoryImpl } from "../domain/repositories/transaction-list-repository-impl";
import { TransactionRepositoryImpl } from "../domain/repositories/transaction-repository-impl";
import { AddTransactions } from "../domain/usecases/AddTransactions";
import { DeleteTransaction } from "../domain/usecases/DeleteTransaction";
import { FilterTransactions } from "../domain/usecases/FilterTransactions";
import { GetTransactions } from "../domain/usecases/GetTransactions";
import { GetTransactionsYearsAndMonths } from "../domain/usecases/GetTransactionsYearsAndMonths";
import { UpdateTransaction } from "../domain/usecases/UpdateTransaction";

const remote = new FirebaseFirestore();
const repository = new TransactionRepositoryImpl(remote);
const listRepository = new TransactionListRepositoryImpl(remote);

export const container = {
  getTransactions: new GetTransactions(repository),
  addTransaction: new AddTransactions(repository),
  updateTransaction: new UpdateTransaction(repository),
  deleteTransaction: new DeleteTransaction(repository),
  filterTransactions: new FilterTransactions(listRepository),
  getTransactionsYearsAndMonths: new GetTransactionsYearsAndMonths(
    listRepository,
  ),
};
