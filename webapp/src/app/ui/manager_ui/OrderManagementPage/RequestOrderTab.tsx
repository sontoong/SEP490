import { TableColumnsType } from "antd";
import {
  calculateDateToNow,
  formatCurrency,
  formatDateToLocal,
} from "../../../utils/helpers";
import { Order } from "../../../models/order";
import { Table } from "../../../components/table";
import RequestOrderDropdown from "./RequestOrderDropdown";

export default function RequestOrderTab(props: CustomerOrderTabProps) {
  const contractListColumns: TableColumnsType<Order> = [
    {
      title: "ID yêu cầu",
      render: (_, { OrderId }) => (
        <div className="text-base font-bold">{OrderId}</div>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "CustomerId",
    },
    {
      title: "Ngày đặt",
      dataIndex: "PurchaseTime",
      render: (value) => <div>{formatDateToLocal(value)}</div>,
      sorter: (a, b) =>
        (calculateDateToNow({
          time: a.PurchaseTime,
          format: false,
        }) as number) -
        (calculateDateToNow({
          time: b.PurchaseTime,
          format: false,
        }) as number),
    },
    {
      title: "Tổng giá",
      render: (_, { OrderDetails }) => {
        const totalPrice = OrderDetails.reduce(
          (prev, cur) => prev + cur.TotalPrice,
          0,
        );
        return <div>{formatCurrency(totalPrice)}</div>;
      },
    },
    {
      title: "Leader",
      dataIndex: "CustomerId",
    },
    {
      title: "",
      key: "actions",
      render: (_, { OrderId }) => <RequestOrderDropdown OrderId={OrderId} />,
    },
  ];
  return (
    <>
      <Table
        columns={contractListColumns}
        dataSource={props.orders}
        rowKey={(record) => record.OrderId}
      />
    </>
  );
}

type CustomerOrderTabProps = {
  orders: Order[];
};
