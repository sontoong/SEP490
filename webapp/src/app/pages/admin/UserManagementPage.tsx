import { Space, TableProps } from "antd";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { useTitle } from "../../hooks/useTitle";
import { Customer, Leader, Worker } from "../../models/user";
import { users } from "../../../constants/testData";
import { accountStatusGenerator } from "../../utils/generators/accountStatus";
import { Avatar } from "../../components/avatar";
import UserManagementDropdown from "../../ui/admin_ui/UserManagementDropdown";
import { roleNameGenerator } from "../../utils/generators/roleName";
import CreateNewAccountModalButton from "../../ui/admin_ui/CreateNewAccountModalButton";

export default function UserManagementPage() {
  useTitle({ tabTitle: "User Management - EWMH" });
  const [searchForm] = Form.useForm();

  const initialValues = {
    searchString: "",
  };

  const handleSearchSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="px-10 py-10">
      <Space direction="vertical" size={20} className="w-full">
        <div className="flex justify-end">
          <CreateNewAccountModalButton />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-primary">
            Danh sách người dùng
          </div>
          <Form
            form={searchForm}
            initialValues={initialValues}
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
        <Table
          columns={userListColumns} //weird lib bug
          dataSource={users}
          rowKey={(record) => record.AccountId}
        />
      </Space>
    </div>
  );
}

const userListColumns: TableProps<Leader | Customer | Worker | any>["columns"] =
  [
    {
      title: "Tên",
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
      title: "Vai trò",
      dataIndex: "Role",
      render: (_, { Role }) => (
        <div className="text-sm">{roleNameGenerator(Role)}</div>
      ),
      filters: [
        {
          text: "Quản trị viên",
          value: "1",
        },
        {
          text: "Quản lý",
          value: "2",
        },
        {
          text: "Lãnh đạo",
          value: "3",
        },
        {
          text: "Nhân viên",
          value: "4",
        },
        {
          text: "Khách hàng",
          value: "5",
        },
      ],
      onFilter: (value, record) => record.Role === value,
    },
    {
      title: "Trạng thái",
      dataIndex: "IsDisabled",
      render: (_, { IsDisabled }) => accountStatusGenerator(IsDisabled),
      filters: [
        {
          text: "Hoạt động",
          value: "false",
        },
        {
          text: "Vô hiệu hóa",
          value: "true",
        },
      ],
      onFilter: (value, record) => record.IsDisabled.toString() === value,
    },
    {
      title: "Ghi chú",
      dataIndex: "DisabledReason",
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => <UserManagementDropdown record={record} />,
    },
  ];
