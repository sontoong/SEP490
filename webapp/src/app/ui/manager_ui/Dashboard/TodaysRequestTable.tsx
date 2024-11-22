import { Table } from "../../../components/table";
import { TableColumnsType } from "antd";
import { Request } from "../../../models/request";
import {
  requestStatusGenerator,
  requestTypeGenerator,
} from "../../../utils/generators/requestStatus";
import { formatDateToLocal } from "../../../utils/helpers";
import { EyeOutlined } from "@ant-design/icons";
import { useRequest } from "../../../hooks/useRequest";
import { usePagination } from "../../../hooks/usePagination";
import { useCallback, useEffect } from "react";

export default function TodaysRequestTable(props: TodaysRequestTableProps) {
  const { state, handleGetAllTodaysRequestsPaginated } = useRequest();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();
  const { handleGetDetailsOfRequest } = useRequest();

  const fetchRequests = useCallback(() => {
    handleGetAllTodaysRequestsPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
    });
  }, [currentPage, currentPageSize, handleGetAllTodaysRequestsPaginated]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const contractListColumns: TableColumnsType<Request> = [
    {
      title: "Khách hàng",
      render: (_, { customer_Leader }) => (
        <div className="text-base font-bold">{customer_Leader[0].fullName}</div>
      ),
    },
    {
      title: "Loại yêu cầu",
      dataIndex: ["request", "categoryRequest"],
      render: (value) => requestTypeGenerator(value),
    },
    {
      title: "Bắt đầu",
      dataIndex: ["request", "start"],
      render: (value) => <div>{formatDateToLocal(value)}</div>,
    },
    {
      title: "Kết thúc",
      dataIndex: ["request", "end"],
      render: (value) => <div>{value ? formatDateToLocal(value) : "N/A"}</div>,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (_, { request }) => {
        return <div>{requestStatusGenerator(request.status)}</div>;
      },
    },
    {
      title: "",
      key: "actions",
      render: (_, { request }) => (
        <EyeOutlined
          onClick={() => {
            if (props.setDrawerOpen) {
              props.setDrawerOpen(true);
              handleGetDetailsOfRequest({ RequestId: request.requestId });
            }
          }}
        />
      ),
    },
  ];
  return (
    <Table
      columns={contractListColumns}
      dataSource={state.todaysRequestList.requests}
      rowKey={(record) => record.request.requestId}
      loading={state.isFetching}
      pagination={{
        showSizeChanger: true,
        total: state.todaysRequestList.total,
        pageSize: currentPageSize,
        current: currentPage,
        onChange: (pageIndex, pageSize) => {
          goToPage(pageIndex);
          setPageSize(pageSize);
        },
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} trong tổng ${total} trưởng nhóm`,
        pageSizeOptions: [5, 10, 20, 50, 100],
      }}
    />
  );
}

type TodaysRequestTableProps = {
  setDrawerOpen?: any;
};
