import { PieChart } from "../../../components/charts";
import { useDashboard } from "../../../hooks/useDashboard";

export const RevenueChart = () => {
  const { state } = useDashboard();

  return <PieChart data={state.revenueChart} loading={state.isFetching} />;
};
