import { TransactionType } from "@/src/models/shared";
import { useAppSelector } from "@/src/store/hooks";
import {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
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
  const [search, setSearch] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const deferredSearch = useDeferredValue(search);

  const [_, startTransition] = useTransition();

  const handleSearchChange = useCallback((value: string) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(value), 500);
  }, []);

  const handleActiveTransactionFilter = (value: TransactionType) => {
    startTransition(() => {
      setSelectedTransactionType(value);
    });
  };

  const transactionFormDataCategory = useAppSelector(
    selectTransactionFormDataCategory,
  );

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = deferredSearch.toLowerCase();
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
  }, [transactions, deferredSearch, selectedTransactionType]);

  return {
    selectedTransactionType,
    filteredTransactions,
    handleSearchChange,
    handleActiveTransactionFilter,
    search: inputValue,
    transactionFormDataCategory,
  };
}
