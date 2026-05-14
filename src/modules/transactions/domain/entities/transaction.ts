import { CategoryType, TransactionType } from "@/src/models/shared";

export interface ITransaction {
  amount: string;
  category: CategoryType;
  date: string;
  description: string;
  id: string;
  type: TransactionType;
}


export interface ICatrgory {
  
}