import { createSlice } from "@reduxjs/toolkit";
import { IHomeChartData } from "../../domain/entries/home";
import { getChartData } from "../actions";
import { TransactionType } from "@/src/models/shared";

export interface HomeChartDataState {
  chartData: IHomeChartData;
  selectedType: TransactionType;
}

const initialState: HomeChartDataState = {
  chartData: [],
  selectedType: TransactionType.DEPOSIT,
};

export const getHomeChartDataSlice = createSlice({
  name: "chartData",
  initialState,
  reducers: {
    setSelectedType(state, action) {
      state.selectedType = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getChartData.fulfilled, (state, action) => {
      state.chartData = action.payload;
    });
  },
});
