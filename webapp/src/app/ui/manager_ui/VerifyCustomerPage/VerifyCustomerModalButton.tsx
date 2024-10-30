import { useState } from "react";
import {
  CalendarFilled,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Modal } from "../../../components/modals";
import { Space } from "antd";
import { OutlineButton, PrimaryButton } from "../../../components/buttons";
import { Grid } from "../../../components/grids";
import { Avatar } from "../../../components/avatar";
import { Customer } from "../../../models/user";

export default function VerifyCustomerModalButton({
  customer,
}: VerifyCustomerModalProps) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <EyeOutlined onClick={() => setIsModalVisible(true)} />
      <Modal
        title={
          <Space className="text-base">
            <UserOutlined />
            <div className="uppercase text-secondary">
              Thông tin của {customer.Fullname}
            </div>
          </Space>
        }
        open={isModalVisible}
        maskClosable={false}
        footer={[
          <OutlineButton
            key="reject"
            text="Không duyệt"
            onClick={() => setIsModalVisible(false)}
            size="middle"
          />,
          <PrimaryButton
            key="accept"
            text="Duyệt tài khoản"
            onClick={() => setIsModalVisible(false)}
            size="middle"
          />,
        ]}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        // confirmLoading={state.isSending}
      >
        <Grid
          className="text-sm"
          items={[
            <Space direction="vertical" size={10}>
              <Avatar src={customer.AvatarUrl} size={70} />
              <div>
                <strong>Họ và Tên:</strong> {customer.Fullname}
              </div>
              <div>
                <strong>Leader đã nhận:</strong>{" "}
                {customer.RoomId ? customer.RoomId : "N/A"}
              </div>
              <div>
                <strong>Chung cư:</strong>{" "}
                {customer.RoomId ? customer.RoomId : "N/A"}
              </div>
              <div>
                <strong>Phòng:</strong>{" "}
                {customer.RoomId ? customer.RoomId : "N/A"}
              </div>
            </Space>,
            <Space direction="vertical" size={15}>
              <div className="text-lg font-bold uppercase">
                Thông tin cá nhân
              </div>
              <Space direction="vertical" size={10}>
                <div>
                  <Space direction="horizontal" size={3}>
                    <PhoneFilled />
                    <strong>SĐT:</strong>
                    <span>{customer.PhoneNumber}</span>
                  </Space>
                </div>
                <div>
                  <Space direction="horizontal" size={3}>
                    <CalendarFilled />
                    <strong>Ngày sinh:</strong>
                    <span>{customer.DateOfBirth}</span>
                  </Space>
                </div>
                <div>
                  <Space direction="horizontal" size={3}>
                    <MailFilled />
                    <strong>Email:</strong>
                    <span>{customer.Email}</span>
                  </Space>
                </div>
              </Space>
            </Space>,
          ]}
        />
      </Modal>
    </>
  );
}

type VerifyCustomerModalProps = {
  customer: Customer;
};
