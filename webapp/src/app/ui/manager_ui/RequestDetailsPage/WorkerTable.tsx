import { Space, TableProps } from "antd";
import { Table } from "../../../components/table";
import { Worker } from "../../../models/user";
import { Avatar } from "../../../components/avatar";
import { workers } from "../../../../constants/testData";
import { StarFilled } from "@ant-design/icons";

export default function WorkerTable() {
  const contractListColumns: TableProps<Worker | any>["columns"] = [
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
      title: "SĐT",
      dataIndex: "PhoneNumber",
    },
    {
      title: "",
      key: "actions",
      render: (_, __, index) => (index === 0 ? <StarFilled /> : null),
    },
  ];
  return (
    <Table
      columns={contractListColumns} //weird lib bug
      dataSource={workers}
      rowKey={(record) => record.AccountId}
      pagination={false}
    />
  );
}
