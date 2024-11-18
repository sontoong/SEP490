import { useEffect, useState } from "react";
import {
  CalendarFilled,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Modal } from "../../../components/modals";
import { Space } from "antd";
import { PrimaryButton } from "../../../components/buttons";
import { Grid } from "../../../components/grids";
import { PendingCustomer } from "../../../models/user";
import { useApartment } from "../../../hooks/useApartment";
import { useAccount } from "../../../hooks/useAccount";
import { formatDateToLocal } from "../../../utils/helpers";
import { Form } from "../../../components/form";
import { InputSelect } from "../../../components/inputs";

export default function VerifyCustomerModalButton({
  customer,
}: VerifyCustomerModalProps) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [addRoomForm] = Form.useForm();
  const { state: apartmentState, handleGetAllRoomsPaginated } = useApartment();
  const { state: accountState, handleApproveCustomerAccount } = useAccount();

  const initialValues = {
    roomIds: [],
  };

  useEffect(() => {
    if (isModalVisible) {
      handleGetAllRoomsPaginated({
        AreaId: customer.apartment[0].areaId,
        PageIndex: 1,
        Pagesize: 1000,
      });
    }
  }, [customer.apartment, handleGetAllRoomsPaginated, isModalVisible]);

  function handleApprove(values: typeof initialValues) {
    console.log(values);
    handleApproveCustomerAccount({
      values: {
        pendingAccountId: customer.get.pendingAccountId,
        isApproval: true,
        roomIds: values.roomIds,
      },
      callBackFn: () => setIsModalVisible(false),
    });
  }

  return (
    <>
      <EyeOutlined onClick={() => setIsModalVisible(true)} />
      <Modal
        title={
          <Space className="text-base">
            <UserOutlined />
            <div className="uppercase text-secondary">
              Thông tin của {customer.get.fullName}
            </div>
          </Space>
        }
        afterClose={addRoomForm.resetFields}
        open={isModalVisible}
        maskClosable={false}
        footer={[
          <PrimaryButton
            key="accept"
            text="Duyệt tài khoản"
            onClick={() => addRoomForm.submit()}
            size="middle"
            loading={accountState.isSending}
          />,
        ]}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        confirmLoading={accountState.isSending}
      >
        <Grid
          className="text-sm"
          items={[
            <Space direction="vertical" size={15}>
              <div className="text-lg font-bold uppercase">
                Thông tin cá nhân
              </div>
              <Space direction="vertical" size={10}>
                <div>
                  <strong>Họ và Tên:</strong> {customer.get.fullName}
                </div>
                <div>
                  <Space direction="horizontal" size={3}>
                    <PhoneFilled />
                    <strong>SĐT:</strong>
                    <span>{customer.get.phoneNumber}</span>
                  </Space>
                </div>
                <div>
                  <Space direction="horizontal" size={3}>
                    <CalendarFilled />
                    <strong>Ngày sinh:</strong>
                    <span>{formatDateToLocal(customer.get.dateOfBirth)}</span>
                  </Space>
                </div>
                <div>
                  <Space direction="horizontal" size={3}>
                    <MailFilled />
                    <strong>Email:</strong>
                    <span>{customer.get.email}</span>
                  </Space>
                </div>
              </Space>
            </Space>,
            <Space direction="vertical" size={15} className="w-full">
              <div className="text-lg font-bold uppercase">Gán phòng</div>
              <Form
                form={addRoomForm}
                initialValues={initialValues}
                name="SearchForm"
                onFinish={handleApprove}
                className="w-full"
              >
                <Form.Item
                  noStyle
                  name="roomIds"
                  rules={[
                    {
                      required: true,
                      message: "Chưa thêm phòng",
                    },
                  ]}
                >
                  <InputSelect
                    mode={"multiple"}
                    allowClear
                    options={apartmentState.currentRoomList.rooms.map(
                      (room) => ({ label: room.roomId, value: room.roomId }),
                    )}
                    className="w-full"
                  />
                </Form.Item>
              </Form>
            </Space>,
          ]}
        />
      </Modal>
    </>
  );
}

type VerifyCustomerModalProps = {
  customer: PendingCustomer;
};
