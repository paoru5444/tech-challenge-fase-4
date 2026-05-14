import { router } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { transactionsSlice } from "../../store/slices";
import { useAppDispatch } from "@/src/store/hooks";

export default function CategoriesCalendar() {
  const { width } = Dimensions.get("screen");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(transactionsSlice.actions.setTransactionFormDataDate(""));
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        style={{ width, padding: 16 }}
        onDayPress={({ dateString }) => {
          dispatch(
            transactionsSlice.actions.setTransactionFormDataDate(dateString),
          );
          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
