import { Table } from "../../../components/table";
import { Space, TableColumnsType } from "antd";
import { formatCurrency, formatDateToLocal } from "../../../utils/helpers";
import {
  CalendarFilled,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Order } from "../../../models/order";
import { Modal } from "../../../components/modals";
import { Avatar } from "../../../components/avatar";
import { customers, orders } from "../../../../constants/testData";
import { Divider } from "../../../components/divider";
import { roleNameGenerator } from "../../../utils/generators/roleName";

export default function CustomerOrderTab(props: CustomerOrderTabProps) {
  const [modal, contextHolder] = Modal.useModal();

  const contractListColumns: TableColumnsType<Order> = [
    {
      title: "ID",
      render: (_, { OrderId }) => (
        <div className="text-base font-bold">{OrderId}</div>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "CustomerId",
    },
    {
      title: "Đặt vào",
      dataIndex: "PurchaseTime",
      render: (value) => <div>{formatDateToLocal(value)}</div>,
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
      title: "",
      key: "actions",
      render: (_, { OrderId }) =>
        ViewDetailButton({ OrderId: OrderId, modal: modal }),
    },
  ];
  return (
    <>
      <Table
        columns={contractListColumns} //weird lib bug
        dataSource={props.orders}
        rowKey={(record) => record.OrderId}
      />
      {contextHolder}
    </>
  );
}

type CustomerOrderTabProps = {
  orders: Order[];
};

function ViewDetailButton({ modal, OrderId }: { modal: any; OrderId: string }) {
  const record = orders.find((order) => order.OrderId === OrderId);
  const customer = customers.find(
    (customer) => customer.CustomerId === record?.CustomerId,
  );
  console.log(customer);

  function handleViewDetail() {
    modal.info({
      icon: <UserOutlined />,
      width: "fit-content",
      title: (
        <div className="text-sm uppercase text-secondary">
          Chi tiết đơn hàng
        </div>
      ),
      content: (
        <Space
          direction="horizontal"
          size={25}
          className="w-full pb-5 pr-10 text-sm"
        >
          <Space direction="vertical" size={10}>
            <Avatar src={customer?.AvatarUrl} size={70} />
            <div>
              <strong>Họ và Tên:</strong> {customer?.Fullname}
            </div>
            <div>
              <strong>Vai trò:</strong> {roleNameGenerator(customer?.Role)}
            </div>
          </Space>
          <Divider type="vertical" className="h-[150px] bg-black" />
          <Space direction="vertical" size={15}>
            <div className="text-lg font-bold uppercase">Thông tin cá nhân</div>
            <Space direction="vertical" size={10}>
              <div>
                <Space direction="horizontal" size={3}>
                  <PhoneFilled />
                  <strong>SĐT:</strong>
                  <span>{customer?.Fullname}</span>
                </Space>
              </div>
              <div>
                <Space direction="horizontal" size={3}>
                  <CalendarFilled />
                  <strong>Ngày sinh:</strong>
                  <span>{customer?.DateOfBirth}</span>
                </Space>
              </div>
              <div>
                <Space direction="horizontal" size={3}>
                  <MailFilled />
                  <strong>Email:</strong>
                  <span>{customer?.Email}</span>
                </Space>
              </div>
            </Space>
          </Space>
        </Space>
      ),
      onOk() {},
    });
  }
  return <EyeOutlined onClick={() => handleViewDetail()} />;
}
