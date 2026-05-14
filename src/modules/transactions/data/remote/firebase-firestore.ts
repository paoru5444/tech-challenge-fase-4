import { db } from "@/src/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ITransaction } from "../../domain/entities/transaction";
import { FormDataProps } from "@/src/models/shared";

export class FirebaseFirestore {
  user = null;

  private getTransactionRef(userId: string) {
    return collection(db, "users", userId, "transactions");
  }

  async getTransactions(userId: string): Promise<ITransaction[]> {
    const transactionRef = this.getTransactionRef(userId);
    const res = (await getDocs(query(transactionRef))).docs;

    const docs: ITransaction[] = res.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ITransaction, "id">),
    }));

    return docs;
  }

  async addTransactions(
    userId: string,
    transaction: ITransaction,
  ): Promise<ITransaction> {
    const transactionRef = this.getTransactionRef(userId);
    const docRef = doc(transactionRef);
    await setDoc(docRef, transaction);
    return { ...transaction, id: docRef.id };
  }

  async deleteTransaction(userId: string, transactionId: string) {
    return await deleteDoc(
      doc(db, "users", userId, "transactions", transactionId),
    );
  }

  async updateTransaction(
    userId: string,
    transactionId: string,
    transaction: FormDataProps,
  ): Promise<ITransaction> {
    const docRef = doc(db, "users", userId, "transactions", transactionId);
    await updateDoc(docRef, transaction);
    const snap = await getDoc(docRef);
    return { id: snap.id, ...(snap.data() as Omit<ITransaction, "id">) };
  }

  filterTransactions = async (
    userId: string,
    year: string,
    month: string,
    category: string,
    perScroll: number,
  ) => {
    const transactionRef = this.getTransactionRef(userId);

    const queries = [];

    if (year && month) {
      const monthPadded = String(month).padStart(2, "0");
      const start = `${year}-${monthPadded}-01`;
      const end = `${year}-${monthPadded}-31`;
      queries.push(where("date", ">=", start));
      queries.push(where("date", "<=", end));
    } else if (year) {
      const start = `${year}-01-01`;
      const end = `${year}-12-31`;
      queries.push(where("date", ">=", start));
      queries.push(where("date", "<=", end));
    }

    if (category) {
      queries.push(where("category.key", "==", category));
    }

    const response = await getDocs(
      query(transactionRef, limit(perScroll), ...queries),
    );
    const docs: ITransaction[] = response.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ITransaction, "id">),
    }));

    return docs;
  };
}
