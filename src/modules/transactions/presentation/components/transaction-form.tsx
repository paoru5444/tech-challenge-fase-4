import Navbar from "@/src/components/shared/navbar";
import Button from "@/src/components/ui/button";
import { View } from "react-native";

import ElipsesBackground from "@/src/components/shared/elipses-background";
import { router } from "expo-router";
import React from "react";
import TrasactionForm from "./form";
import { FORM_TYPES, INPUT_FIELDS } from "@/src/constants/info";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { FORM_MODE, FormDataProps } from "@/src/models/shared";

export type TransactionFormLocalSearchParams = {
  actionLabel?: string;
  image?: string;
  navbarLabel?: string;
  type?: keyof typeof FORM_TYPES;
  id?: string;
  amount?: string;
  date?: string;
  description?: string;
  mode?: string;
  fileName?: string;
};

export type FormTypeProps = {
  image: any;
  navbarLabel: string;
  actionLabel: string;
  type: string;
};

export interface TransactionFormProps {
  localSearchParams?: TransactionFormLocalSearchParams;
  onCreate: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  formType: FormTypeProps;
  openCategoryBottomSheet: () => void;
  openCalendarBottomSheet: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setIsReadOnly: (value: boolean) => void;
  control: Control<FormDataProps>;
  errors: FieldErrors<FormDataProps>;
  handleGetFile: () => void;
  isSubmitting: boolean;
  pageTitle: string;
  file: File | null;
  isReadOnly: boolean;
  loading: boolean;
  setValue: UseFormSetValue<FormDataProps>;
}

export default function TransactionForm({
  localSearchParams,
  onCreate,
  onUpdate,
  onDelete,
  formType,
  openCategoryBottomSheet,
  openCalendarBottomSheet,
  isEditing,
  setIsEditing,
  setIsReadOnly,
  control,
  errors,
  isSubmitting,
  pageTitle,
  handleGetFile,
  isReadOnly,
  loading,
}: TransactionFormProps) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        flex: 1,
        paddingBottom: 40,
        paddingHorizontal: 22,
        backgroundColor: "#FDFDFD",
      }}
    >
      <ElipsesBackground />

      <Navbar />

      <TrasactionForm
        fields={INPUT_FIELDS}
        headerImage={formType.image}
        pageTitle={pageTitle}
        disableFields={localSearchParams?.mode === FORM_MODE.VIEW && !isEditing}
        openCategoryBottomSheet={openCategoryBottomSheet}
        openCalendarBottomSheet={openCalendarBottomSheet}
        control={control}
        errors={errors}
        handleGetFile={handleGetFile}
        isReadOnly={isReadOnly}
        isEditing={isEditing}
        localSearchParams={localSearchParams}
      />

      {localSearchParams?.mode === FORM_MODE.CREATE && (
        <Button
          onPress={onCreate}
          label={"Salvar"}
          disabled={isSubmitting || loading}
          isLoading={loading}
        />
      )}

      {localSearchParams?.mode === FORM_MODE.UPDATE && (
        <Button
          onPress={() => {
            onUpdate();
            router.back();
          }}
          label={"Salvar"}
          disabled={isSubmitting || loading}
          isLoading={loading}
        />
      )}

      {localSearchParams?.mode === FORM_MODE.VIEW && (
        <View style={{ gap: 8 }}>
          <Button
            onPress={() => {
              if (!isEditing) {
                setIsEditing(true);
                setIsReadOnly(false);
              } else {
                onUpdate();
              }
            }}
            label={isEditing ? "Salvar" : "Atualizar"}
            disabled={isSubmitting || loading}
            isLoading={loading}
          />

          <Button
            onPress={() => {
              if (isEditing) {
                setIsEditing(false);
                setIsReadOnly(true);
              } else {
                onDelete();
              }
            }}
            label={isEditing ? "Cancelar" : "Deletar"}
            style={{ backgroundColor: "#F06480" }}
            disabled={isSubmitting || loading}
            isLoading={loading}
          />
        </View>
      )}
    </View>
  );
}
