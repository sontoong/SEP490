import { ColumnChart } from "../../../components/charts";
import { useDashboard } from "../../../hooks/useDashboard";

export function NetGainChart() {
  const { state } = useDashboard();

  return (
    <div>
      {/* <div className="mb-10 text-sm font-semibold">
        Tổng cộng: {formatCurrency(state.netGainChart.total)}
      </div> */}
      <ColumnChart
        data={state.netGainChart.values.chartValues}
        loading={state.isFetching}
      />
    </div>
  );
}
