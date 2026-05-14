import { CategoryType, TransactionType } from "@/src/models/shared";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useCallback, useMemo, useState } from "react";
import {
  selectTransactionFormDataCategory,
  selectTransactions,
} from "../../store/selectors";
import { transactionsSlice } from "../../store/slices";

export function useFilterTransactions() {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectTransactions);

  const [selectedTransactionType, setSelectedTransactionType] = useState(
    TransactionType.ALL,
  );
  const [search, setSearch] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleActiveTransactionFilter = (value: TransactionType) => {
    setSelectedTransactionType(value);
  };

  const transactionFormDataCategory = useAppSelector(
    selectTransactionFormDataCategory,
  );

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return transactions.filter((transaction) => {
      const matchSearch = transaction.description
        .toLowerCase()
        .includes(normalizedSearch);

      const matchType =
        selectedTransactionType === TransactionType.ALL
          ? true
          : transaction.type === selectedTransactionType;

      return matchSearch && matchType;
    });
  }, [transactions, search, selectedTransactionType]);

  return {
    selectedTransactionType,
    filteredTransactions,
    handleSearchChange,
    handleActiveTransactionFilter,
    search,
    transactionFormDataCategory,
  };
}
