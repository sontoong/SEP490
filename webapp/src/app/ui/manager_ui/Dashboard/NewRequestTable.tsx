import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/table";
import { Space, TableColumnsType } from "antd";
import { Request } from "../../../models/request";
import {
  requestStatusGenerator,
  requestTypeGenerator,
} from "../../../utils/generators/requestStatus";
import { formatDateToLocal } from "../../../utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { requests } from "../../../../constants/testData";

export default function NewRequestTable() {
  const navigate = useNavigate();

  const contractListColumns: TableColumnsType<Request> = [
    {
      title: "Khách hàng",
      render: (_, { CustomerId }) => (
        <div className="text-base font-bold">{CustomerId}</div>
      ),
    },
    {
      title: "Loại yêu cầu",
      dataIndex: "CategoryRequest",
      render: (value) => requestTypeGenerator(value),
    },
    {
      title: "Bắt đầu",
      dataIndex: "Start",
      render: (value) => <div>{formatDateToLocal(value)}</div>,
    },
    {
      title: "Kết thúc",
      dataIndex: "End",
      render: (value) => <div>{formatDateToLocal(value)}</div>,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (_, { Status }) => {
        return <div>{requestStatusGenerator(Status)}</div>;
      },
    },
    {
      title: "",
      key: "actions",
      render: (_, { RequestId }) => (
        <EyeOutlined onClick={() => navigate(`/requests/${RequestId}`)} />
      ),
    },
  ];

  return (
    <Space direction="vertical" size={20} className="w-full">
      <div className="pb-10 text-5xl font-semibold text-primary">
        Yêu cầu mới nhất
      </div>
      <Table
        columns={contractListColumns}
        dataSource={requests}
        rowKey={(record) => record.RequestId}
      />
    </Space>
  );
}
