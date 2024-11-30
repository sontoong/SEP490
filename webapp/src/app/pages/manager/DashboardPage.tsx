import { Col, Drawer, Row, Space } from "antd";
import { useTitle } from "../../hooks/useTitle";
import TodaysRequestTable from "../../ui/manager_ui/Dashboard/TodaysRequestTable";
import { RevenueChart } from "../../ui/manager_ui/Dashboard/RevenueChart";
import { Card } from "../../components/card";
import NetGainChart from "../../ui/manager_ui/Dashboard/NetGainChart";
import ExtraStats from "../../ui/manager_ui/Dashboard/ExtraStats";
import { useDashboard } from "../../hooks/useDashboard";
import { InputDate } from "../../components/inputs";
import { useCallback, useEffect, useState } from "react";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import RequestDetails from "../../ui/manager_ui/Dashboard/RequestDetails/RequestDetails";
import { useSpecialUI } from "../../hooks/useSpecialUI";
import { useRequest } from "../../hooks/useRequest";
import TodaysOrderTab from "../../ui/manager_ui/Dashboard/TodaysOrderTable";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current < dayjs().startOf("year");
};

export default function DashboardPage() {
  useTitle({
    tabTitle: "Dashboard - EWMH",
    paths: [{ title: "", path: "/dashboard" }],
  });
  const { handleGetStatistics } = useDashboard();
  const { state: requestState } = useRequest();
  const { state: specialUIState } = useSpecialUI();
  const [range, setRange] = useState<string[]>();
  const [open, setOpen] = useState(false);

  const fetchStatistics = useCallback(() => {
    handleGetStatistics({
      StartYear: range?.[0],
      EndYear: range?.[1],
    });
  }, [handleGetStatistics, range]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <>
      <Drawer
        title="Thông tin yêu cầu"
        placement="right"
        open={open}
        getContainer={false}
        destroyOnClose
        onClose={() => setOpen(false)}
        width="100%"
        style={{ height: "93vh" }}
      >
        <RequestDetails
          loading={specialUIState.isLoading}
          request={requestState.currentRequest}
        />
      </Drawer>
      <Space direction="vertical" size={40} className="w-full">
        <Space direction="vertical" size={20} className="w-full">
          <div className="text-5xl font-semibold text-primary">Thống kê</div>
          <Row gutter={20}>
            <Col span={18}>
              <Card title="Số lần sử dụng dịch vụ năm nay">
                <RevenueChart />
              </Card>
            </Col>
            <Col span={6}>
              <ExtraStats />
            </Col>
          </Row>
          <Card
            title={
              <Space>
                <div>Trung bình thu nhập từ</div>
                <InputDate.RangePicker
                  disabledDate={disabledDate}
                  picker="year"
                  onChange={(_, values) => setRange(values)}
                  allowClear={false}
                />
              </Space>
            }
          >
            <NetGainChart />
          </Card>
        </Space>
        <Space direction="vertical" size={20} className="relative w-full">
          <div className="text-5xl font-semibold text-primary">
            Danh sách yêu cầu hôm nay
          </div>
          <TodaysRequestTable setDrawerOpen={setOpen} />
        </Space>
        <Space direction="vertical" size={20} className="relative w-full">
          <div className="text-5xl font-semibold text-primary">
            Danh sách đơn hàng hôm nay
          </div>
          <TodaysOrderTab />
        </Space>
      </Space>
    </>
  );
}
