import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { selectUser } from "@/src/modules/auth/store/selectors";
import * as actions from "../../store/actions";
import {
  selectBalance,
  selectHomeChartData,
  selectHomeLastTransactions,
  selectHomeTransactions,
  selectHomeTransactionsLoading,
  selectSelectedType,
} from "../../store/selectors";
import { useCallback } from "react";
import { router } from "expo-router";
import { FORM_TYPES } from "@/src/constants/info";
import { FORM_MODE, TransactionType } from "@/src/models/shared";
import { getHomeChartDataSlice } from "../../store/slices/getHomeChartDataSlice";

export function useHomeTransaction() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const transactions = useAppSelector(selectHomeTransactions);
  const chartData = useAppSelector(selectHomeChartData);
  const lastTransactions = useAppSelector(selectHomeLastTransactions);
  const isLoadingTransactions = useAppSelector(selectHomeTransactionsLoading);
  const selectedType = useAppSelector(selectSelectedType);
  const balance = useAppSelector(selectBalance);

  const getTransactions = useCallback(async () => {
    await dispatch(actions.getTransactions(user?.uid || ""));
  }, [user?.uid]);

  const getLastTransactions = useCallback(async () => {
    await dispatch(actions.getLastTransactions(transactions));
  }, [user?.uid]);

  const getCharData = async () => {
    await dispatch(actions.getChartData({ selectedType, transactions }));
  };

  const getBalance = useCallback(async () => {
    await dispatch(actions.getBalance(transactions));
  }, [transactions]);

  const setSelectedTypes = async (selectedType: TransactionType) => {
    dispatch(getHomeChartDataSlice.actions.setSelectedType(selectedType));
    await dispatch(actions.getChartData({ selectedType, transactions }));
  };

  const openTypesBottomSheet = () => {
    router.push("/types-bottom-sheet");
  };

  const goToTransactionsForm = (type: keyof typeof FORM_TYPES) => {
    router.push({
      pathname: "/(app)/transaction-form",
      params: { ...FORM_TYPES[type], mode: FORM_MODE.CREATE },
    });
  };

  return {
    getTransactions,
    getCharData,
    getLastTransactions,
    getBalance,
    transactions,
    chartData,
    lastTransactions,
    isLoadingTransactions,
    selectedType,
    balance,
    openTypesBottomSheet,
    goToTransactionsForm,
    setSelectedTypes,
  };
}
