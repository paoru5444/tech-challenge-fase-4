import { useLocalSearchParams } from "expo-router";
import React, { lazy, Suspense, useEffect } from "react";
import useTransactions from "../hooks/useTransactions";
import { useFilterTransactions } from "../hooks/useFilterTransactions";
import { usePaginateTransactions } from "../hooks/usePaginateTransactions";
import { Loading } from "@/src/components/shared/loading";

const TransactionsListComponent = lazy(
  () => import("../components/transaction-list"),
);

export default function TransactionsListScreen() {
  const { filterTransactions, loading, goToTransactionsForm } =
    useTransactions();

  const {
    selectedTransactionType,
    filteredTransactions,
    handleActiveTransactionFilter,
    handleSearchChange,
    search,
  } = useFilterTransactions();

  const { onEndReached, onRefresh, refreshing, perScroll } =
    usePaginateTransactions();

  type transactionListSearchParams = {
    category?: string;
    month?: string;
    year?: string;
  };

  const { category, month, year } =
    useLocalSearchParams<transactionListSearchParams>();

  useEffect(() => {
    filterTransactions({ category, month, year, perScroll });
  }, [category, month, year, perScroll]);

  return (
    <Suspense fallback={<Loading />}>
      <TransactionsListComponent
        search={search}
        handleSearchChange={handleSearchChange}
        transactions={filteredTransactions}
        handleActiveTransactionFilter={handleActiveTransactionFilter}
        onPressTransaction={goToTransactionsForm}
        type={selectedTransactionType}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        loading={loading}
      />
    </Suspense>
  );
}
