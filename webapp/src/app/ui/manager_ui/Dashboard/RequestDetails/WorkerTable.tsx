import { Space, TableColumnsType } from "antd";
import { StarFilled } from "@ant-design/icons";
import { Avatar } from "../../../../components/avatar";
import { User } from "../../../../models/user";
import { Table } from "../../../../components/table";

export default function WorkerTable({ workers }: { workers: User[] }) {
  const contractListColumns: TableColumnsType<User> = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      render: (_, { avatarUrl, fullName, email }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={avatarUrl} size={60} />
          <Space direction="vertical">
            <div className="text-base font-bold">{fullName}</div>
            <div>{email}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
    },
    {
      title: "",
      key: "actions",
      render: (_, __, index) => (index === 0 ? <StarFilled /> : null),
    },
  ];
  return (
    <Table
      columns={contractListColumns}
      dataSource={workers}
      rowKey={(record) => record.accountId}
      pagination={false}
    />
  );
}
