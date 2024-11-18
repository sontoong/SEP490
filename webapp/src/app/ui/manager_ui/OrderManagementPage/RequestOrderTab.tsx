import { Drawer, TableColumnsType } from "antd";
import { formatCurrency, formatDateToLocal } from "../../../utils/helpers";
import { RequestOrder } from "../../../models/order";
import { Table } from "../../../components/table";
import RequestOrderDropdown from "./RequestOrderDropdown";
import { useOrder } from "../../../hooks/useOrder";
import { usePagination } from "../../../hooks/usePagination";
import { useCallback, useEffect, useState } from "react";
import RequestDetails from "./RequestDetails/RequestDetails";

export default function RequestOrderTab(props: CustomerOrderTabProps) {
  const { state: orderState, handleGetAllRequestOrderPaginated } = useOrder();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();
  const [tableParams, setTableParams] = useState<TableParams>();
  const [open, setOpen] = useState(false);
  const [requestOrderId, setRequestOrderId] = useState<string>("");

  const fetchOrders = useCallback(() => {
    handleGetAllRequestOrderPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      SearchByPhone: props.searchByPhone,
      DescreasingDateSort: tableParams?.sorter?.["order.purchaseTime"],
    });
  }, [
    currentPage,
    currentPageSize,
    handleGetAllRequestOrderPaginated,
    props.searchByPhone,
    tableParams?.sorter,
  ]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const contractListColumns: TableColumnsType<RequestOrder> = [
    {
      title: "Mã yêu cầu",
      render: (_, { order }) => (
        <div className="text-base font-bold">{order.requestId}</div>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: ["customer_Leader", "0", "fullName"],
    },
    {
      title: "SĐT",
      dataIndex: ["customer_Leader", "0", "phoneNumber"],
    },
    {
      title: "Ngày đặt",
      dataIndex: ["order", "purchaseTime"],
      render: (value) => <div>{formatDateToLocal(value)}</div>,
      sorter: true,
      sortDirections: ["ascend"],
    },
    {
      title: "Tổng giá",
      render: (_, { order }) => {
        return <div>{formatCurrency(order.totalPrice)}</div>;
      },
    },
    {
      title: "Trưởng nhóm",
      dataIndex: ["customer_Leader", "1", "fullName"],
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <RequestOrderDropdown
          requestOrder={record}
          setOpen={setOpen}
          setRequestOrderId={() => setRequestOrderId(record.order.requestId)}
        />
      ),
    },
  ];
  return (
    <>
      <Drawer
        title="Thông tin yêu cầu"
        placement="right"
        open={open}
        getContainer={false}
        destroyOnClose
        onClose={() => setOpen(false)}
        width="100%"
      >
        <RequestDetails requestOrderId={requestOrderId} />
      </Drawer>
      <Table
        columns={contractListColumns}
        dataSource={orderState.currentRequestOrderList.orders}
        rowKey={(record) => record.order.requestId}
        loading={orderState.isFetching}
        pagination={{
          total: orderState.currentOrderList.total,
          pageSize: currentPageSize,
          current: currentPage,
          onChange: (pageIndex, pageSize) => {
            goToPage(pageIndex);
            setPageSize(pageSize);
          },
        }}
        onChange={(_, __, sorter) => {
          setTableParams({
            sorter: {
              "order.purchaseTime": Array.isArray(sorter)
                ? undefined
                : !(sorter.order === "ascend"),
            },
          });
        }}
      />
    </>
  );
}

type CustomerOrderTabProps = {
  searchByPhone?: string;
};

type TableParams = {
  sorter?: {
    "order.purchaseTime": boolean | undefined;
  };
};
