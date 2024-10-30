import { Pie } from "@ant-design/plots";
import { PieChartValue } from "../../models/chart";

function PieChart({ data }: PieChartProps) {
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    label: {
      text: "type",
      position: "outside",
    },
  };

  return <Pie {...config} />;
}

type PieChartProps = {
  data: PieChartValue[];
};

export default PieChart;
