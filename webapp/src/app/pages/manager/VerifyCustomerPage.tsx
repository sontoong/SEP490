import { Form } from "../../components/form";
import { useTitle } from "../../hooks/useTitle";
import { Space, TableColumnsType } from "antd";
import { Input } from "../../components/inputs";
import { Customer } from "../../models/user";
import { Avatar } from "../../components/avatar";
import { Table } from "../../components/table";
import { customers } from "../../../constants/testData";
import VerifyCustomerModalButton from "../../ui/manager_ui/VerifyCustomerPage/VerifyCustomerModalButton";

export default function VerifyCustomerPage() {
  useTitle({
    tabTitle: "Customer Verify - EWMH",
    paths: [{ title: "Danh sách chờ duyệt", path: "/customer-verify" }],
  });
  const [searchForm] = Form.useForm();

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = (values: any) => {
    console.log(values);
  };

  const leaderListColumns: TableColumnsType<Customer> = [
    {
      title: "Họ và Tên",
      dataIndex: "Fullname",
      render: (_, { AvatarUrl, Fullname, Email }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={AvatarUrl} size={60} />
          <Space direction="vertical">
            <div className="text-base font-bold">{Fullname}</div>
            <div>{Email}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "Phòng",
      dataIndex: "RoomId",
    },
    {
      title: "Chung cư",
      dataIndex: "RoomId",
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => <VerifyCustomerModalButton customer={record} />,
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
        <Table
          columns={leaderListColumns}
          dataSource={customers}
          rowKey={(record) => record.AccountId}
        />
      </Space>
    </>
  );
}
