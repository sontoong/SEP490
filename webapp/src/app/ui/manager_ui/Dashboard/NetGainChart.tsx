import { ColumnChart } from "../../../components/charts";
import { useDashboard } from "../../../hooks/useDashboard";

export default function NetGainChart() {
  const { state } = useDashboard();

  return <ColumnChart data={state.netGainChart} loading={state.isFetching} />;
}
