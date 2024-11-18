import { Drawer, Space, TabsProps } from "antd";
import { Tabs } from "../../components/tabs";
import { useTitle } from "../../hooks/useTitle";
import NewRequestTab from "../../ui/manager_ui/RequestManagementPage/NewRequestTab";
import { useState } from "react";
import RequestDetails from "../../ui/manager_ui/RequestManagementPage/RequestDetails/RequestDetails";
import { useRequest } from "../../hooks/useRequest";
import { useSpecialUI } from "../../hooks/useSpecialUI";

export default function RequestManagementPage() {
  useTitle({
    tabTitle: "Requests - EWMH",
    paths: [{ title: "Danh sách yêu cầu", path: "/requests" }],
  });
  const [open, setOpen] = useState(false);
  const { state: requestState } = useRequest();
  const { state: specialUIState } = useSpecialUI();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Yêu cầu mới",
      children: <NewRequestTab status={0} setDrawerOpen={setOpen} />,
    },
    {
      key: "2",
      label: "Đang xử lý",
      children: <NewRequestTab status={1} setDrawerOpen={setOpen} />,
    },
    {
      key: "3",
      label: "Đã hoàn thành",
      children: <NewRequestTab status={2} setDrawerOpen={setOpen} />,
    },
    {
      key: "4",
      label: "Đã hủy",
      children: <NewRequestTab status={3} setDrawerOpen={setOpen} />,
    },
  ];

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
      <Space direction="vertical" size={20} className="w-full">
        <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
      </Space>
    </>
  );
}
