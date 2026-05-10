import { combineSlices } from "@reduxjs/toolkit";

import { getHomeChartDataSlice } from "./getHomeChartDataSlice";
import { getHomeBalanceSlice } from "./getHomeBalance";
import { getHomeTransactionsSlice } from "./getHomeTransactionsSlice";
import { getHomeLastTransactionsSlice } from "./getHomeLastTransactionsSlice";

export const homeReducer = combineSlices(
  getHomeTransactionsSlice,
  getHomeChartDataSlice,
  getHomeBalanceSlice,
  getHomeLastTransactionsSlice,
);
