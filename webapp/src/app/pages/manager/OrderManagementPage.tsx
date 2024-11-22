import { Drawer, Space, TabsProps } from "antd";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Tabs } from "../../components/tabs";
import { useTitle } from "../../hooks/useTitle";
import CustomerOrderTab from "../../ui/manager_ui/OrderManagementPage/CustomerOrderTab";
import RequestOrderTab from "../../ui/manager_ui/OrderManagementPage/RequestOrderTab";
import { useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import RequestDetails from "../../ui/manager_ui/OrderManagementPage/RequestDetails/RequestDetails";
import { useRequest } from "../../hooks/useRequest";
import { useSpecialUI } from "../../hooks/useSpecialUI";

export default function OrderManagementPage() {
  useTitle({
    tabTitle: "Orders - EWMH",
    paths: [{ title: "Danh sách đơn hàng", path: "/orders" }],
  });
  const [searchForm] = Form.useForm();
  const { goToPage } = usePagination();
  const { state: requestState } = useRequest();
  const { state: specialUIState } = useSpecialUI();
  const [searchByPhone, setSearchByPhone] = useState<string>();
  const [open, setOpen] = useState(false);

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = ({ searchString }: typeof initialValuesSearch) => {
    goToPage(1);
    setSearchByPhone(searchString);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đơn hàng của khách hàng",
      children: <CustomerOrderTab searchByPhone={searchByPhone} />,
    },
    {
      key: "2",
      label: "Đơn hàng của yêu cầu",
      children: (
        <RequestOrderTab searchByPhone={searchByPhone} setOpen={setOpen} />
      ),
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
        <div className="flex items-center justify-end">
          <Form
            form={searchForm}
            initialValues={initialValuesSearch}
            name="SearchForm"
            onFinish={handleSearchSubmit}
            className="w-1/2"
          >
            <Form.Item
              noStyle
              name="searchString"
              rules={[
                {
                  type: "string",
                  whitespace: true,
                  message: "",
                },
              ]}
            >
              <Input.Search
                placeholder="Tìm kiếm theo SĐT"
                onSearch={() => searchForm.submit()}
                onClear={() => {
                  searchForm.setFieldValue("searchString", "");
                  searchForm.submit();
                }}
              />
            </Form.Item>
          </Form>
        </div>
        <Tabs defaultActiveKey="1" items={items} destroyInactiveTabPane />
      </Space>
    </>
  );
}
