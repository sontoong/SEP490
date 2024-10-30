import { Column } from "@ant-design/plots";
import { ColumnChartValue } from "../../models/chart";

function ColumnChart({ data }: ColumnChartProps) {
  const config = {
    data,
    xField: "x",
    yField: "y",
    colorField: "name",
    group: true,
  };

  return <Column {...config} />;
}

type ColumnChartProps = {
  data: ColumnChartValue | ColumnChartValue[];
};

export default ColumnChart;
