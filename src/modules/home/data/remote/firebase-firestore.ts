import { db } from "@/src/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { IHomeTransaction } from "../../domain/entries/home";

export class FirebaseFirestore {
  user = null;

  private getTransactionRef(userId: string) {
    return collection(db, "users", userId, "transactions");
  }

  async getTransactions(userId: string): Promise<IHomeTransaction[]> {
    const transactionRef = this.getTransactionRef(userId);
    const res = (await getDocs(query(transactionRef))).docs;

    const docs: IHomeTransaction[] = res.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<IHomeTransaction, "id">),
    }));

    return docs;
  }

  async addTransactions(transaction: IHomeTransaction, userId: string) {
    const transactionRef = this.getTransactionRef(userId);
    return await setDoc(doc(transactionRef), transaction);
  }

  async deleteTransaction(transactionId: string, userId: string) {
    return await deleteDoc(
      doc(db, "users", userId, "transactions", transactionId),
    );
  }

  async updateTransaction(
    transactionId: string,
    userId: string,
    transaction: Omit<IHomeTransaction, "id" | "type">,
  ) {
    return await updateDoc(
      doc(db, "users", userId, "transactions", transactionId),
      transaction,
    );
  }
}
