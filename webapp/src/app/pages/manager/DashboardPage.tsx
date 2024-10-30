import { Col, Row, Space } from "antd";
import { useTitle } from "../../hooks/useTitle";
import NewRequestTable from "../../ui/manager_ui/Dashboard/NewRequestTable";
import { RevenueChart } from "../../ui/manager_ui/Dashboard/RevenueChart";
import { Card } from "../../components/card";
import NetGainChart from "../../ui/manager_ui/Dashboard/NetGainChart";
import ExtraStats from "../../ui/manager_ui/Dashboard/ExtraStats";

export default function DashboardPage() {
  useTitle({
    tabTitle: "Dashboard - EWMH",
    paths: [{ title: "Thống kê", path: "/dashboard" }],
  });

  return (
    <Space direction="vertical" size={20} className="w-full">
      <Row gutter={20}>
        <Col span={18}>
          <Card title="Trung bình doanh thu năm nay">
            <RevenueChart />
          </Card>
        </Col>
        <Col span={6}>
          <ExtraStats />
        </Col>
      </Row>
      <Card title="Trung bình thu nhập từ">
        <NetGainChart />
      </Card>
      <NewRequestTable />
    </Space>
  );
}
