import { useEffect, useState } from "react";
import { ColumnChart } from "../../../components/charts";
import { ColumnChartValue } from "../../../models/chart";

export default function NetGainChart() {
  const [data, setData] = useState<ColumnChartValue[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          name: "London",
          x: "Jan.",
          y: 18.9,
        },
        {
          name: "London",
          x: "Feb.",
          y: 28.8,
        },
        {
          name: "London",
          x: "Mar.",
          y: 39.3,
        },
        {
          name: "London",
          x: "Apr.",
          y: 81.4,
        },
        {
          name: "London",
          x: "May",
          y: 47,
        },
        {
          name: "London",
          x: "Jun.",
          y: 20.3,
        },
        {
          name: "London",
          x: "Jul.",
          y: 24,
        },
        {
          name: "London",
          x: "Aug.",
          y: 35.6,
        },
        {
          name: "Berlin",
          x: "Jan.",
          y: 12.4,
        },
        {
          name: "Berlin",
          x: "Feb.",
          y: 23.2,
        },
        {
          name: "Berlin",
          x: "Mar.",
          y: 34.5,
        },
        {
          name: "Berlin",
          x: "Apr.",
          y: 99.7,
        },
        {
          name: "Berlin",
          x: "May",
          y: 52.6,
        },
        {
          name: "Berlin",
          x: "Jun.",
          y: 35.5,
        },
        {
          name: "Berlin",
          x: "Jul.",
          y: 37.4,
        },
        {
          name: "Berlin",
          x: "Aug.",
          y: 42.4,
        },
      ]);
    }, 1000);
  }, []);

  return <ColumnChart data={data} />;
}
