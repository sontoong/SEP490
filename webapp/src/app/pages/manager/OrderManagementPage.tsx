import { Space, Tabs, TabsProps } from "antd";
import { Form } from "../../components/form";
import { useTitle } from "../../hooks/useTitle";
import { orders } from "../../../constants/testData";
import { Input } from "../../components/inputs";
import CustomerOrderTab from "../../ui/manager_ui/OrderManagementPage/CustomerOrderTab";

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
      children: <CustomerOrderTab orders={orders} />,
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
