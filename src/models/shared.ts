export enum TransactionType {
  "ALL" = "all",
  "DEPOSIT" = "deposit",
  "WITHDRAW" = "withdraw",
  "TRANSFER" = "transfer",
}

export type CategoryType = { key: string; value: string };

export type Transaction = {
  amount: string;
  category: CategoryType;
  date: string;
  description: string;
  id: string;
  type: TransactionType;
};

export type ChartData =
  | {
      label: string;
      value: number;
    }
  | [];

export type ReducerStatus = "idle" | "loading" | "succeeded" | "failed";

export enum FORM_MODE {
  "CREATE" = "create",
  "VIEW" = "view",
  "UPDATE" = "update",
}
