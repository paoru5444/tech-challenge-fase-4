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

export type FormDataProps = {
  amount: string;
  description: string;
  date: string;
  category: CategoryType;
  fileUrl?: string;
  fileName?: string;
};

export type TransactionFormItem = {
  label: string;
  placeholder: string;
  key: "amount" | "description";
};

export type TransactionFormScreenLocalSearchParams = {
  actionLabel?: string;
  image?: any;
  mode?: "create" | "update" | "view";
  navbarLabel?: string;
  type?: "deposit" | "withdraw" | "transfer";
  amount?: string;
  categoryKey?: string;
  categoryValue?: string;
  date?: string;
  description?: string;
  id?: string;
};

export interface onCreateTransaction {
  amount: string;
  category: { key: string; value: string };
  date: string;
  description: string;
}

export interface onUpdateTransaction {
  amount: string;
  category: { key: string; value: string };
  date: string;
  description: string;
}
