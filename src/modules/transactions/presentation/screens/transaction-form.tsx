import React, { lazy, Suspense } from "react";
import { useTransactionForm } from "../hooks/useTransactionForm";
import { Loading } from "@/src/components/shared/loading";

const TransactionForm = lazy(() => import("../components/transaction-form"));

export default function TransactionFormScreen() {
  const {
    localSearchParams,
    onCreate,
    onUpdate,
    onDelete,
    openCategoryBottomSheet,
    openCalendarBottomSheet,
    isEditing,
    setIsEditing,
    setIsReadOnly,
    control,
    errors,
    setValue,
    isSubmitting,
    isReadOnly,
    pageTitle,
    handleSubmit,
    formType,
  } = useTransactionForm();

  return (
    <Suspense fallback={<Loading />}>
      <TransactionForm
        localSearchParams={localSearchParams}
        onCreate={handleSubmit(onCreate)}
        onUpdate={handleSubmit(onUpdate)}
        onDelete={onDelete}
        formType={formType}
        openCategoryBottomSheet={openCategoryBottomSheet}
        openCalendarBottomSheet={openCalendarBottomSheet}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setIsReadOnly={setIsReadOnly}
        control={control}
        errors={errors}
        setValue={setValue}
        isSubmitting={isSubmitting}
        pageTitle={pageTitle}
        isReadOnly={isReadOnly}
      />
    </Suspense>
  );
}
