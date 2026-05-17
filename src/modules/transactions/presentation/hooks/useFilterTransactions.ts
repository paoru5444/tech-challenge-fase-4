import { Transaction, TransactionType } from "@/src/models/shared";
import { useAppSelector } from "@/src/store/hooks";
import { useCallback, useMemo, useState, useTransition } from "react";
import { useReactiveSearch } from "@/src/hooks/useReactiveSearch";
import {
  selectTransactionFormDataCategory,
  selectTransactions,
} from "../../store/selectors";

export function useFilterTransactions() {
  const transactions = useAppSelector(selectTransactions);

  const [selectedTransactionType, setSelectedTransactionType] = useState(
    TransactionType.ALL,
  );
  const [inputValue, setInputValue] = useState("");
  const [, startTransition] = useTransition();

  const fetcher = useCallback(
    (query: string): Promise<Transaction[]> => {
      const normalized = query.toLowerCase();
      return Promise.resolve(
        transactions.filter((t) =>
          t.description.toLowerCase().includes(normalized),
        ),
      );
    },
    [transactions],
  );

  const { data: searchResults, search } = useReactiveSearch<Transaction>(
    fetcher,
    350,
    0,
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setInputValue(value);
      search(value);
    },
    [search],
  );

  const handleActiveTransactionFilter = (value: TransactionType) => {
    startTransition(() => setSelectedTransactionType(value));
  };

  const transactionFormDataCategory = useAppSelector(
    selectTransactionFormDataCategory,
  );

  const filteredTransactions = useMemo(() => {
    const base = !inputValue.trim() ? transactions : searchResults;
    return base.filter((t) =>
      selectedTransactionType === TransactionType.ALL
        ? true
        : t.type === selectedTransactionType,
    );
  }, [inputValue, transactions, searchResults, selectedTransactionType]);

  return {
    selectedTransactionType,
    filteredTransactions,
    handleSearchChange,
    handleActiveTransactionFilter,
    search: inputValue,
    transactionFormDataCategory,
  };
}
