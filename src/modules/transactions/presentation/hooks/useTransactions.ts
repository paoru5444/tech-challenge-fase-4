import * as actions from "../../store/actions";
import { selectUser } from "@/src/modules/auth/store/selectors";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { FORM_MODE, FormDataProps } from "@/src/models/shared";
import {
  selectFilterMonths,
  selectFilterYears,
  selectIsLoading,
  selectTransactions,
} from "../../store/selectors";
import { ITransaction } from "../../domain/entities/transaction";
import { router } from "expo-router";

const useTransactions = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const transactions = useAppSelector(selectTransactions);
  const months = useAppSelector(selectFilterMonths);
  const years = useAppSelector(selectFilterYears);
  const loading = useAppSelector(selectIsLoading);

  const getTransactions = async () => {
    dispatch(actions.getTransactions(user?.uid ?? ""));
  };

  const addTransactions = async (data: FormDataProps) => {
    dispatch(
      actions.addTransaction({ userId: user?.uid ?? "", formData: data }),
    );
    console.log("Transferência adicionada com sucesso: ", data);
  };

  const deleteTransaction = async (transactionId: string) => {
    dispatch(
      actions.deleteTransaction({ userId: user?.uid ?? "", transactionId }),
    );
  };

  const updateTransaction = async (
    transaction: FormDataProps,
    transactionId: string,
  ) => {
    dispatch(
      actions.updateTransaction({
        userId: user?.uid ?? "",
        transactionId,
        formData: transaction,
      }),
    );
  };

  const getTransactionsYearsAndMonths = async () => {
    dispatch(actions.getTransactionsYearsAndMonths(transactions));
  };

  const filterTransactions = async ({
    year,
    month,
    category,
    perScroll,
  }: {
    year?: string;
    month?: string;
    category?: string;
    perScroll: number;
  }) => {
    dispatch(
      actions.filterTransactions({
        userId: user?.uid ?? "",
        year: year ?? "",
        month: month ?? "",
        category: category ?? "",
        perScroll,
      }),
    );
  };

  const goToTransactionsForm = (item: ITransaction) => {
    const { category, ...rest } = item;
    router.push({
      pathname: "/(app)/transaction-form",
      params: {
        ...rest,
        categoryKey: category.key,
        categoryValue: category.value,
        mode: FORM_MODE.VIEW,
      },
    });
  };

  return {
    getTransactions,
    addTransactions,
    transactions,
    deleteTransaction,
    updateTransaction,
    getTransactionsYearsAndMonths,
    months,
    years,
    filterTransactions,
    loading,
    goToTransactionsForm,
  };
};

export default useTransactions;
