import { Table } from "antd";
import { useTitle } from "../../hooks/useTitle";

export default function DashboardPage() {
  useTitle({
    tabTitle: "Dashboard - EWMH",
    title: `Thống Kê`,
    path: "/dashboard",
  });
  return (
    <div>
      <Table />
      <Table />
      <Table />
      <Table />
    </div>
  );
}
