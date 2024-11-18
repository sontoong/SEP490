import { Pie } from "@ant-design/plots";
import { PieChartValue } from "../../models/chart";

function PieChart({ data, loading }: PieChartProps) {
  const config = {
    data,
    angleField: "value",
    colorField: "name",
    label: {
      text: "name",
      position: "outside",
    },
  };

  return <Pie {...config} loading={loading} />;
}

type PieChartProps = {
  data: PieChartValue[];
  loading?: boolean;
};

export default PieChart;
