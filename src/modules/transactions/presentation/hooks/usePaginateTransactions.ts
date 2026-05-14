import { useAppSelector } from "@/src/store/hooks";
import { useCallback, useState } from "react";
import { selectTransactions } from "../../store/selectors";
import { TRANSACTIONS_PER_PAGE } from "@/src/constants/info";
import useTransactions from "./useTransactions";
import { useLocalSearchParams } from "expo-router";

type transactionListSearchParams = {
  category?: string;
  month?: string;
  year?: string;
};

export function usePaginateTransactions() {
  const transactions = useAppSelector(selectTransactions);
  const { category, month, year } =
    useLocalSearchParams<transactionListSearchParams>();

  const [refreshing, setRefreshing] = useState(false);
  const [perScroll, setPerScroll] = useState(TRANSACTIONS_PER_PAGE);

  const { filterTransactions } = useTransactions();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      filterTransactions({ category, month, year, perScroll });
    } finally {
      setRefreshing(false);
    }
  }, [category, month, year]);

  const onEndReached = () => {
    if (perScroll > transactions.length) return;
    setPerScroll((prev: number) => prev + TRANSACTIONS_PER_PAGE);
  };

  return {
    refreshing,
    onRefresh,
    onEndReached,
    perScroll,
  };
}
