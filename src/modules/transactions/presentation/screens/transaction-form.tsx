import TransactionForm from "../components/transaction-form";

import { FORM_TYPES } from "@/src/constants/info";
import { useTransactionForm } from "../hooks/useTransactionForm";

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
  );
}
