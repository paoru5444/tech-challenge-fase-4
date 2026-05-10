import React, { useEffect } from "react";
import Home from "../components/home";
import { useHomeTransaction } from "../hooks/useHomeTransactions";

export default function HomeScreen() {
  const {
    getTransactions,
    getLastTransactions,
    getCharData,
    getBalance,
    chartData,
    lastTransactions,
    isLoadingTransactions,
    selectedType,
    balance,
    goToTransactionsForm,
    openTypesBottomSheet,
  } = useHomeTransaction();

  useEffect(() => {
    getTransactions();
    getBalance();
    getCharData();
    getLastTransactions();
  }, []);

  return (
    <Home
      goToTransactionsForm={goToTransactionsForm}
      balance={balance}
      chartData={chartData}
      openTypesBottomSheet={openTypesBottomSheet}
      selectedType={selectedType}
      lastTransactions={lastTransactions}
      loading={isLoadingTransactions}
    />
  );
}
