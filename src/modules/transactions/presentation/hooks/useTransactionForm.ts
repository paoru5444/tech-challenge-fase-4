import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { useEffect, useMemo, useState } from "react";
import useTransactions from "./useTransactions";
import { FORM_TYPES } from "@/src/constants/info";
import { router, useLocalSearchParams } from "expo-router";
import {
  FormDataProps,
  onCreateTransaction,
  onUpdateTransaction,
  TransactionFormScreenLocalSearchParams,
} from "@/src/models/shared";
import {
  selectTransactionFormDataCategory,
  selectTransactionFormDataDate,
} from "../../store/selectors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formInSchema } from "@/src/schemas/transaction-form-schema";
import { transactionsSlice } from "../../store/slices";
import { Keyboard } from "react-native";

export function useTransactionForm() {
  const dispatch = useAppDispatch();

  const { addTransactions, deleteTransaction, updateTransaction } =
    useTransactions();

  const [isEditing, setIsEditing] = useState(false);

  const transactionFormDataDate = useAppSelector(selectTransactionFormDataDate);
  const transactionFormDataCategory = useAppSelector(
    selectTransactionFormDataCategory,
  );

  const localSearchParams =
    useLocalSearchParams<TransactionFormScreenLocalSearchParams>();

  const [isReadOnly, setIsReadOnly] = useState(
    localSearchParams?.mode === "view",
  );

  const type = localSearchParams.type ?? "deposit";

  const formType = FORM_TYPES[type];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProps>({
    resolver: zodResolver(formInSchema),
    defaultValues: {
      amount: localSearchParams?.amount || "",
      description: localSearchParams?.description || "",
      date: localSearchParams?.date || "",
      category: {
        key: localSearchParams?.categoryKey || "",
        value: localSearchParams?.categoryValue || "",
      },
    },
  });

  useEffect(() => {
    const category = !transactionFormDataCategory?.key
      ? {
          key: localSearchParams?.categoryKey || "",
          value: localSearchParams?.categoryValue || "",
        }
      : transactionFormDataCategory;

    const date = transactionFormDataDate || localSearchParams?.date || "";

    setValue("category", category);
    setValue("date", date);
  }, [
    localSearchParams?.categoryKey,
    localSearchParams?.categoryValue,
    localSearchParams?.date,
    transactionFormDataCategory,
    transactionFormDataDate,
  ]);

  const resetFormDateAndCategory = async () => {
    dispatch(transactionsSlice.actions.setTransactionFormDataDate(""));
    dispatch(
      transactionsSlice.actions.setTransactionFormDataCategory(
        transactionsSlice.getInitialState().transactionFormDataCategory,
      ),
    );
  };

  const onCreate = async (data: onCreateTransaction) => {
    Keyboard.dismiss();

    const payload = {
      ...data,
      date: transactionFormDataDate,
      category: transactionFormDataCategory,
    };

    addTransactions(payload);

    await resetFormDateAndCategory();

    router.replace("/(app)/(tabs)");
  };

  const onDelete = async () => {
    await deleteTransaction(localSearchParams.id ?? "");
    await resetFormDateAndCategory();
    router.replace("/(app)/(tabs)/transactions-list");
  };

  const onUpdate = async (data: onUpdateTransaction) => {
    Keyboard.dismiss();
    await updateTransaction(data, localSearchParams.id ?? "");
    await resetFormDateAndCategory();
    router.replace("/(app)/(tabs)/transactions-list");
  };

  const openCategoryBottomSheet = () => {
    router.push("/categories-bottom-sheet");
  };

  const openCalendarBottomSheet = () => {
    router.push("/calendar-bottom-sheet");
  };

  const pageTitleOptions = {
    create: "Registrar nova\n" + formType.navbarLabel,
    update: "Atualizar\n" + formType.navbarLabel,
    view: "Detalhes da\n" + formType.navbarLabel,
  };

  const pageTitle = useMemo(() => {
    if (isReadOnly) {
      return pageTitleOptions["view"];
    } else if (isEditing) {
      return pageTitleOptions["update"];
    } else {
      return pageTitleOptions["create"];
    }
  }, [isEditing, isReadOnly, pageTitleOptions]);

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    setIsEditing,
    setIsReadOnly,
    onCreate,
    onDelete,
    onUpdate,
    openCategoryBottomSheet,
    openCalendarBottomSheet,
    pageTitle,
    localSearchParams,
    formType,
    isEditing,
    setValue,
    isReadOnly,
  };
}
