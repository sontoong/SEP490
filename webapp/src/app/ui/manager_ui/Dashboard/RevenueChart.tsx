import { useEffect, useState } from "react";
import { PieChart } from "../../../components/charts";
import { PieChartValue } from "../../../models/chart";

export const RevenueChart = () => {
  const [data, setData] = useState<PieChartValue[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { type: "Đơn hàng", value: 27 },
        { type: "Dịch vụ", value: 25 },
      ]);
    }, 1000);
  }, []);

  return <PieChart data={data} />;
};
