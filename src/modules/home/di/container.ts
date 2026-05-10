import { FirebaseFirestore } from "../data/remote/firebase-firestore";
import { HomeRepositoryImpl } from "../domain/repositories/home-repository-impl";
import { GetBalance } from "../domain/usercases/GetBalance";
import { GetChartData } from "../domain/usercases/GetChartData";
import { GetLastTransactions } from "../domain/usercases/GetLastTransactions";
import { GetTransactions } from "../domain/usercases/GetTransactions";

const remote = new FirebaseFirestore();
const repository = new HomeRepositoryImpl(remote);

export const container = {
  getBalance: new GetBalance(repository),
  getTransactions: new GetTransactions(repository),
  getLastTransactions: new GetLastTransactions(repository),
  getChartData: new GetChartData(repository),
};
