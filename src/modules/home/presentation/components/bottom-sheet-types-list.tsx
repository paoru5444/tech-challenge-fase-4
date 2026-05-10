import Badge from "@/src/components/ui/bedge";
import Button from "@/src/components/ui/button";
import Typography from "@/src/components/ui/typography";
import { barChartTypes } from "@/src/constants/info";
import { TransactionType } from "@/src/models/shared";
import { useHomeTransaction } from "@/src/modules/home/presentation/hooks/useHomeTransactions";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function BottomSheetTypesList() {
  const { setSelectedTypes } = useHomeTransaction();

  const [selectedType, setSelectedType] = useState<TransactionType>(
    TransactionType.ALL,
  );

  const onSelectCategory = () => {
    setSelectedTypes(selectedType);
    router.back();
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
        <Typography weight="600">Categorsias: </Typography>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {Object.entries(TransactionType).map(([key, value]) => (
            <Badge
              key={key}
              label={barChartTypes[value]}
              onPress={() => setSelectedType(value)}
              isActive={value === selectedType}
            />
          ))}
        </View>

        <Button label="Selecionar" onPress={onSelectCategory} />
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
