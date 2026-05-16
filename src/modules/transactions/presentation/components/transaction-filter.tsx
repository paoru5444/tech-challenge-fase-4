import Badge from "@/src/components/ui/bedge";
import Button from "@/src/components/ui/button";
import Typography from "@/src/components/ui/typography";
import useCategories from "@/src/modules/transactions/presentation/hooks/useCategories";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { monthNamesInPortuguese } from "@/src/constants/info";
import { CategoryType } from "@/src/models/shared";
import useTransactions from "../hooks/useTransactions";

export default function TransactionFilter() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    key: "",
    value: "",
  });

  const { getCategories, categories, loading } = useCategories();
  const { getTransactionsYearsAndMonths, months, years } = useTransactions();

  useEffect(() => {
    getCategories();
    getTransactionsYearsAndMonths();
  }, []);

  const handleSelectedCategory = (category: CategoryType) => {
    setSelectedCategory(category);
  };

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
          {!loading &&
            Object.entries(categories).map(([key, value]) => (
              <Badge
                key={key}
                label={value}
                onPress={() => handleSelectedCategory({ key, value })}
                isActive={key === selectedCategory?.key}
              />
            ))}
        </View>

        <Typography weight="600">Ano: </Typography>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {years.map((value) => (
            <Badge
              key={value}
              label={value}
              onPress={() => setSelectedYear(value)}
              isActive={value === selectedYear}
            />
          ))}
        </View>

        <Typography weight="600">Mês: </Typography>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {months.map((value) => (
            <Badge
              key={value}
              label={monthNamesInPortuguese[parseInt(value - 1)]}
              onPress={() => setSelectedMonth(value)}
              isActive={value === selectedMonth}
            />
          ))}
        </View>

        {!loading && (
          <Button
            label="Filtrar"
            onPress={() => {
              router.dismissTo({
                pathname: "/(app)/(tabs)/transactions-list",
                params: {
                  month: selectedMonth,
                  year: selectedYear,
                  category: selectedCategory.key,
                },
              });
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
