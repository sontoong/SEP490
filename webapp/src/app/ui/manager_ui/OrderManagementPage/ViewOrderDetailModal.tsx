import { useState } from "react";
import { customers, orders, products } from "../../../../constants/testData";
import {
  CheckCircleTwoTone,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Modal } from "../../../components/modals";
import { Space } from "antd";
import { Avatar } from "../../../components/avatar";
import { combineArraysLoose, formatCurrency } from "../../../utils/helpers";
import { Grid } from "../../../components/grids";
import { List } from "../../../components/list";
import { PrimaryButton } from "../../../components/buttons";

export function ViewDetailButton({ OrderId }: { OrderId: string }) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const record = orders.find((order) => order.OrderId === OrderId);
  const customer = customers.find(
    (customer) => customer.CustomerId === record?.CustomerId,
  );

  return (
    <>
      <EyeOutlined onClick={() => setIsModalVisible(true)} />
      <Modal
        title={
          <Space className="text-base">
            <ShoppingCartOutlined />
            <div className="uppercase text-secondary">Chi tiết đơn hàng</div>
          </Space>
        }
        maskClosable={false}
        open={isModalVisible}
        footer={[
          <PrimaryButton
            text="Đóng"
            onClick={() => setIsModalVisible(false)}
          />,
        ]}
        closeIcon={null}
        width={1000}
        // confirmLoading={state.isSending}
      >
        <Grid
          className="text-sm"
          items={[
            <Space direction="vertical" size={10} className="w-full">
              <Avatar src={customer?.AvatarUrl} size={70} />
              <div>
                <strong>Họ và Tên:</strong> {customer?.Fullname}
              </div>
              <div>
                <Space direction="horizontal" size={3}>
                  <PhoneFilled />
                  <strong>SĐT:</strong>
                  <span>{customer?.PhoneNumber}</span>
                </Space>
              </div>
              <div>
                <Space direction="horizontal" size={3}>
                  <MailFilled />
                  <strong>Email:</strong>
                  <span>{customer?.Email}</span>
                </Space>
              </div>
              <div>
                <strong>Chung cư:</strong> {customer?.RoomId}
              </div>
              <div>
                <strong>Phòng:</strong> {customer?.RoomId}
              </div>
              <div>
                <strong>Leader:</strong> {customer?.Role}
              </div>
            </Space>,
            <Space direction="vertical" size={15} className="w-full">
              <div>
                <div className="text-2xl font-bold">Đơn hàng</div>
                <div className="text-xs text-gray-400">#{OrderId}</div>
              </div>
              <div>
                <strong>Ngày đặt:</strong> 13/11/2024
              </div>
              <List
                fontSize={16}
                itemLayout="vertical"
                dataSource={combineArraysLoose(record?.OrderDetails, products, [
                  "ProductId",
                ])}
                footer={
                  <div className="flex justify-between text-base">
                    <div className="font-bold uppercase">Tổng tiền</div>
                    <div className="font-bold">{formatCurrency(500)}</div>
                  </div>
                }
                renderItem={(item) => {
                  return (
                    <List.Item
                      key={item.ProductId}
                      extra={
                        <Space size={20}>
                          <div>
                            <div>
                              <span>Giá gốc: </span>
                              {formatCurrency(item.ProductPrices?.PriceByDate)}
                            </div>
                            <div className="font-bold">
                              <span>Tổng: </span>
                              {item.ProductPrices?.PriceByDate
                                ? formatCurrency(
                                    item.ProductPrices?.PriceByDate *
                                      item.Quantity,
                                  )
                                : "N/A"}
                            </div>
                          </div>
                        </Space>
                      }
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            size={50}
                            src={item.ImageUrl}
                            shape="square"
                          />
                        }
                        title={
                          <div className="font-normal">
                            <Space>
                              <div>{item.Name}</div>
                              <div>
                                {item.Status ? (
                                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Space>
                            <div>Số lượng: {item.Quantity}</div>
                          </div>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </Space>,
          ]}
        />
      </Modal>
    </>
  );
}
