import { Space, TableProps, Tag } from "antd";
import { Avatar } from "../../components/avatar";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { useTitle } from "../../hooks/useTitle";
import { Customer, Leader, Worker } from "../../models/user";
import CreateNewAccountModalButton from "../../ui/admin_ui/UserManagementPage/CreateNewAccountModalButton";
import UserManagementDropdown from "../../ui/admin_ui/UserManagementPage/UserManagementDropdown";
import { accountStatusGenerator } from "../../utils/generators/accountStatus";
import { roleNameGenerator } from "../../utils/generators/roleName";

import { users } from "../../../constants/testData";
import { Modal } from "../../components/modals";
import { WarningOutlined } from "@ant-design/icons";

export default function UserManagementPage() {
  useTitle({ tabTitle: "User Management - EWMH" });
  const [modal, contextHolder] = Modal.useModal();
  const [searchForm] = Form.useForm();
  const [disableReasonForm] = Form.useForm();

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = (values: any) => {
    console.log(values);
  };

  function handleConfirmLock() {
    const initialValuesDisableReason = {
      disableReason: "",
    };

    const handleConfirmLockSubmit = (values: any) => {
      console.log(values);
    };

    modal.confirm({
      icon: <WarningOutlined />,
      width: "fit-content",
      afterClose: () => {
        disableReasonForm.resetFields();
      },
      title: (
        <div className="flex items-center whitespace-nowrap text-sm">
          <span>Bạn có muốn đổi trạng thái thành</span>
          <Tag color="volcano" className="mx-1">
            Vô hiệu hóa
          </Tag>
          <span>?</span>
        </div>
      ),
      content: (
        <Space direction="vertical" className="w-full">
          <div className="text-base text-secondary">Ghi chú</div>
          <Form
            form={disableReasonForm}
            initialValues={initialValuesDisableReason}
            name="DisableReasonForm"
            onFinish={handleConfirmLockSubmit}
          >
            <Form.Item
              noStyle
              name="disableReason"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input.TextArea placeholder="Nhập ghi chú" />
            </Form.Item>
          </Form>
        </Space>
      ),
      onOk: async () => {
        const sleep = (ms: number) => {
          return new Promise((resolve) => setTimeout(resolve, ms));
        };

        disableReasonForm.submit();
        await sleep(1000); // Example delay
      },
    });
  }

  function handleConfirmUnlock() {
    modal.confirm({
      icon: <WarningOutlined />,
      width: "fit-content",
      title: (
        <div className="flex items-center whitespace-nowrap text-sm">
          <span>Bạn có muốn đổi trạng thái thành</span>
          <Tag color="green" className="mx-1">
            Đang hoạt động
          </Tag>
          <span>?</span>
        </div>
      ),
      onOk() {},
    });
  }

  const userListColumns: TableProps<
    Leader | Customer | Worker | any
  >["columns"] = [
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
          text: "Leader",
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
      render: (_, { IsDisabled }) => {
        return (
          <div
            onClick={() =>
              IsDisabled ? handleConfirmUnlock() : handleConfirmLock()
            }
            className="cursor-pointer"
          >
            {accountStatusGenerator(IsDisabled)}
          </div>
        );
      },
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
        <Table
          columns={userListColumns} //weird lib bug
          dataSource={users}
          rowKey={(record) => record.AccountId}
        />
      </Space>
      {contextHolder}
    </div>
  );
}
