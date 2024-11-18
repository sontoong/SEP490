import { Table } from "../../../components/table";
import { TableColumnsType } from "antd";
import { formatCurrency, formatDateToLocal } from "../../../utils/helpers";
import { Order } from "../../../models/order";
import { ViewDetailButton } from "./ViewOrderDetailModal";
import { useOrder } from "../../../hooks/useOrder";
import { usePagination } from "../../../hooks/usePagination";
import { useCallback, useEffect, useState } from "react";

export default function CustomerOrderTab(props: CustomerOrderTabProps) {
  const { state, handleGetAllOrderPaginated } = useOrder();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();
  const [tableParams, setTableParams] = useState<TableParams>();

  const fetchOrders = useCallback(() => {
    handleGetAllOrderPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      SearchByPhone: props.searchByPhone,
      DescreasingDateSort: tableParams?.sorter?.["order.purchaseTime"],
    });
  }, [
    currentPage,
    currentPageSize,
    handleGetAllOrderPaginated,
    props.searchByPhone,
    tableParams?.sorter,
  ]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const contractListColumns: TableColumnsType<Order> = [
    {
      title: "Mã đơn hàng",
      render: (_, { order }) => (
        <div className="text-base font-bold">{order?.orderId}</div>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: ["customer", "0", "fullName"],
    },
    {
      title: "SĐT",
      dataIndex: ["customer", "0", "phoneNumber"],
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
        return <div>{formatCurrency(order?.totalPrice)}</div>;
      },
    },
    {
      title: "",
      key: "actions",
      render: (_, { order }) => <ViewDetailButton orderId={order?.orderId} />,
    },
  ];
  return (
    <>
      <Table
        columns={contractListColumns}
        dataSource={state.currentOrderList.orders}
        rowKey={(record) => record.order?.orderId}
        loading={state.isFetching}
        pagination={{
          total: state.currentOrderList.total,
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
