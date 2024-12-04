import { Drawer, Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Card } from "../../components/card";
import { InputDate } from "../../components/inputs";
import { useDashboard } from "../../hooks/useDashboard";
import { useRequest } from "../../hooks/useRequest";
import { useSpecialUI } from "../../hooks/useSpecialUI";
import { useTitle } from "../../hooks/useTitle";
import { NetGainChart } from "../../ui/manager_ui/Dashboard/NetGainChart";
import RequestDetails from "../../ui/manager_ui/Dashboard/RequestTable/RequestDetails/RequestDetails";
import TodaysOrderTable from "../../ui/manager_ui/Dashboard/OrderTable/TodaysOrderTable";
import TodaysRequestTable from "../../ui/manager_ui/Dashboard/RequestTable/TodaysRequestTable";
import TopServicePackagesTable from "../../ui/manager_ui/Dashboard/ServicePackageTable/TopServicePackagesTable";
import TopProductsTable from "../../ui/manager_ui/Dashboard/ProductTable/TopProductsTable";
import { NetGainByMonthChart } from "../../ui/manager_ui/Dashboard/NetGainByMonthChart";

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current < dayjs().startOf("year");
};

export default function DashboardPage() {
  useTitle({
    tabTitle: "Dashboard - EWMH",
    paths: [{ title: "", path: "/dashboard" }],
  });
  const { handleGetStatistics, handleGetStatisticsByMonth } = useDashboard();
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
  }, [fetchStatistics, handleGetStatisticsByMonth]);

  useEffect(() => {
    handleGetStatisticsByMonth({ Num: 3 });
  }, [handleGetStatisticsByMonth]);

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
          {/* <Row gutter={20}>
            <Col span={18}>
              <Card title="Số lần sử dụng dịch vụ năm nay">
                <RevenueChart />
              </Card>
            </Col>
            <Col span={6}>
              <ExtraStats />
            </Col>
          </Row> */}
          <Card
            title={
              <Space>
                <div>Tổng doanh thu 3 tháng gần nhất</div>
              </Space>
            }
          >
            <NetGainByMonthChart />
          </Card>
          <Card
            title={
              <Space>
                <div>Tổng doanh thu theo từng năm</div>
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
          <Card title="Danh sách yêu cầu hôm nay">
            <TodaysRequestTable setDrawerOpen={setOpen} />
          </Card>
        </Space>
        <Space direction="vertical" size={20} className="relative w-full">
          <Card title="Danh sách đơn hàng hôm nay">
            <TodaysOrderTable />
          </Card>
        </Space>
        <Space direction="vertical" size={20} className="relative w-full">
          <Card title="Danh sách các mặt hàng nổi trội">
            <TopProductsTable />
          </Card>
        </Space>
        <Space direction="vertical" size={20} className="relative w-full">
          <Card title="Danh sách các gói dịch vụ được mua nhiều nhất">
            <TopServicePackagesTable />
          </Card>
        </Space>
      </Space>
    </>
  );
}
