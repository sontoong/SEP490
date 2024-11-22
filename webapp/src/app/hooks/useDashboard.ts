import { App } from "antd";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  getStatistics,
  GetStatisticsParams,
  setRevenueChart,
  setNetGainChart,
  setExtraStats,
} from "../redux/slice/dashboardSlice";
import { ColumnChartValue, PieChartValue } from "../models/chart";

export function useDashboard() {
  const { notification } = App.useApp();
  const state = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const handleGetStatistics = useCallback(
    async (value: GetStatisticsParams) => {
      const resultAction = await dispatch(getStatistics(value));
      if (getStatistics.fulfilled.match(resultAction)) {
        const revenueChart: PieChartValue[] = resultAction.payload[0]
          .map((item: any) => {
            if (item.x === new Date().getFullYear()) {
              return {
                name: item.name,
                value: item.z,
              };
            }
            return null;
          })
          .filter((item: any) => item !== null);
        const netGainChart: ColumnChartValue[] = resultAction.payload[0].map(
          (item: any) => {
            return {
              name: item.name,
              x: item.x,
              y: item.y,
            };
          },
        );

        dispatch(setRevenueChart(revenueChart));
        dispatch(setNetGainChart(netGainChart));
        dispatch(setExtraStats(resultAction.payload[1]));
      } else {
        if (resultAction.payload) {
          notification.error({
            message: "Lỗi",
            description: `${resultAction.payload}`,
            placement: "topRight",
          });
        } else {
          notification.error({
            message: "Lỗi",
            description: resultAction.error.message,
            placement: "topRight",
          });
        }
      }
    },
    [dispatch, notification],
  );

  return {
    state,
    handleGetStatistics,
  };
}
