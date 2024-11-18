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
import { useCallback, useEffect } from "react";
import { usePagination } from "../../../hooks/usePagination";

export default function NewRequestTab(props: NewRequestTabProps) {
  const { state, handleGetAllRequestPaginated, handleGetDetailsOfRequest } =
    useRequest();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();

  const fetchRequests = useCallback(() => {
    handleGetAllRequestPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      Status: props.status,
    });
  }, [
    currentPage,
    currentPageSize,
    handleGetAllRequestPaginated,
    props.status,
  ]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const contractListColumns: TableColumnsType<Request> = [
    {
      title: "Mã yêu cầu",
      dataIndex: ["request", "requestId"],
    },
    {
      title: "Khách hàng",
      dataIndex: ["customer_Leader", "0", "fullName"],
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
              handleGetDetailsOfRequest({ RequestId: request.requestId });
              window.scrollTo(0, 0);
              props.setDrawerOpen(true);
            }
          }}
        />
      ),
    },
  ];
  return (
    <Table
      columns={contractListColumns}
      dataSource={state.currentRequestList.requests}
      rowKey={(record) => record.request.requestId}
      loading={state.isFetching}
      pagination={{
        total: state.currentRequestList.total,
        pageSize: currentPageSize,
        current: currentPage,
        onChange: (pageIndex, pageSize) => {
          goToPage(pageIndex);
          setPageSize(pageSize);
        },
      }}
    />
  );
}

type NewRequestTabProps = {
  status: number;
  setDrawerOpen?: any;
};
