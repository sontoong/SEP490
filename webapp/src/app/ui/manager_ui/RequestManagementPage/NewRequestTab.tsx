import { Table } from "../../../components/table";
import { TableColumnsType } from "antd";
import { Request } from "../../../models/request";
import {
  requestStatusGenerator,
  requestTypeGenerator,
} from "../../../utils/generators/requestStatus";
import { formatDateToLocal } from "../../../utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function NewRequestTab(props: NewRequestTabProps) {
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
    <Table
      columns={contractListColumns} //weird lib bug
      dataSource={props.requests}
      rowKey={(record) => record.RequestId}
    />
  );
}

type NewRequestTabProps = {
  requests: Request[];
};
