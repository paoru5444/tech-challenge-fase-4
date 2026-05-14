import Badge from "@/src/components/ui/bedge";
import Button from "@/src/components/ui/button";
import Typography from "@/src/components/ui/typography";
import useCategories from "@/src/hooks/useCategories";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch } from "@/src/store/hooks";
import { transactionsSlice } from "../../store/slices";

export default function CategoriesList() {
  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState({
    key: "",
    value: "",
  });

  const { getCategories, categories } = useCategories();

  useEffect(() => {
    dispatch(
      transactionsSlice.actions.setTransactionFormDataCategory(
        transactionsSlice.getInitialState().transactionFormDataCategory,
      ),
    );
    getCategories();
  }, [getCategories]);

  return (
    <View style={styles.container}>
      <View
        style={{
          minHeight: 200,
          paddingVertical: 40,
          paddingHorizontal: 32,
          gap: 16,
        }}
      >
        <Typography weight="600">Categorias: </Typography>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {Object.entries(categories).map(([key, value]) => (
            <Badge
              key={key}
              label={value}
              onPress={() => setSelectedCategory({ key, value })}
              isActive={key === selectedCategory.key}
            />
          ))}
        </View>

        <Button
          label="Selecionar"
          onPress={() => {
            dispatch(
              transactionsSlice.actions.setTransactionFormDataCategory(
                selectedCategory,
              ),
            );
            router.back();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
