import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../services/agent";
import { AxiosError } from "axios";
import { excludedActionsPending } from "./specialUISlice";
import { ColumnChartValue, PieChartValue } from "../../models/chart";

export type TDashboard = {
  netGainChart: ColumnChartValue[];
  revenueChart: PieChartValue[];
  extraStats: {
    name: string;
    currentMonthCount: number;
    previousMonthCount: number;
    change: number;
  }[];
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TDashboard = {
  netGainChart: [],
  revenueChart: [],
  extraStats: [],
  isFetching: false,
  isSending: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setNetGainChart: (
      state,
      action: PayloadAction<TDashboard["netGainChart"]>,
    ) => {
      state.netGainChart = action.payload;
    },
    setRevenueChart: (
      state,
      action: PayloadAction<TDashboard["revenueChart"]>,
    ) => {
      state.revenueChart = action.payload;
    },
    setExtraStats: (state, action: PayloadAction<TDashboard["extraStats"]>) => {
      state.extraStats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("dashboard/fetch/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        () => {
          return {
            ...initialState,
            isFetching: true,
          };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("dashboard/send/") &&
          action.type.endsWith("/pending") &&
          !excludedActionsPending.includes(action.type),
        (state) => {
          return { ...state, isSending: true };
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("dashboard/send/") &&
          action.type.endsWith("/fulfilled"),
        () => {
          return { ...initialState };
        },
      );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("dashboard/") &&
        (action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")),
      (state) => {
        state.isFetching = false;
        state.isSending = false;
      },
    );
  },
});

export const getStatistics = createAsyncThunk<any, GetStatisticsParams>(
  "dashboard/fetch/getStatistics",
  async (data, { rejectWithValue }) => {
    const { EndYear, StartYear } = data;
    try {
      let startYear = StartYear;
      if (!StartYear) {
        startYear = new Date().getFullYear().toString();
      }

      const response = await agent.Transaction.getStatistics({
        startYear,
        EndYear,
      });
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const { setNetGainChart, setRevenueChart, setExtraStats } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;

export type GetStatisticsParams = {
  StartYear?: string;
  EndYear?: string;
};
