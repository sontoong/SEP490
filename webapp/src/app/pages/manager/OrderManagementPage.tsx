import { Space, TabsProps } from "antd";
import { orders } from "../../../constants/testData";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Tabs } from "../../components/tabs";
import { useTitle } from "../../hooks/useTitle";
import CustomerOrderTab from "../../ui/manager_ui/OrderManagementPage/CustomerOrderTab";
import RequestOrderTab from "../../ui/manager_ui/OrderManagementPage/RequestOrderTab";

export default function OrderManagementPage() {
  useTitle({
    tabTitle: "Orders - EWMH",
    paths: [{ title: "Danh sách đơn hàng", path: "/orders" }],
  });
  const [searchForm] = Form.useForm();

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = (values: any) => {
    console.log(values);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đơn hàng của khách hàng",
      children: <CustomerOrderTab orders={orders} />,
    },
    {
      key: "2",
      label: "Đơn hàng của yêu cầu",
      children: <RequestOrderTab orders={orders} />,
    },
  ];

  return (
    <>
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
                  required: true,
                  whitespace: true,
                  message: "",
                },
              ]}
            >
              <Input.Search
                placeholder="Tìm kiếm"
                onSearch={() => searchForm.submit()}
              />
            </Form.Item>
          </Form>
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </Space>
    </>
  );
}
