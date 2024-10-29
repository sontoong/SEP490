import { customers, requests } from "../../../../constants/testData";
import { LikeOutlined, MailFilled, PhoneFilled } from "@ant-design/icons";
import { Modal } from "../../../components/modals";
import { Rate, Space } from "antd";
import { Avatar } from "../../../components/avatar";
import { Grid } from "../../../components/grids";
import { PrimaryButton } from "../../../components/buttons";
import { Feedback } from "../../../models/feedback";

export function ViewRatingDetailModal({
  feedback,
  isModalVisible,
  setIsModalVisible,
}: {
  feedback: Feedback;
  isModalVisible: boolean;
  setIsModalVisible: any;
}) {
  const customerId = requests.find(
    (request) => request.RequestId === feedback.RequestId,
  )?.CustomerId;
  const customer = customers.find(
    (customer) => customer.CustomerId === customerId,
  );

  return (
    <>
      <Modal
        title={
          <Space className="text-base">
            <LikeOutlined />
            <div className="uppercase text-secondary">Chi tiết đơn hàng</div>
          </Space>
        }
        maskClosable={false}
        open={isModalVisible}
        footer={[
          <PrimaryButton
            key="close"
            text="Đóng"
            onClick={() => setIsModalVisible(false)}
            size="middle"
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
                <div className="text-2xl font-bold">Đánh giá</div>
                <Rate disabled allowHalf value={feedback.Rate} />
              </div>
              <div>{feedback.Content}</div>
            </Space>,
          ]}
        />
      </Modal>
    </>
  );
}
