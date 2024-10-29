import { HomeOutlined } from "@ant-design/icons";
import { Modal } from "../../../components/modals";
import { Space, TableColumnsType } from "antd";
import { PrimaryButton } from "../../../components/buttons";
import AddRoomModalButton from "./AddRoomModalButton";
import { Table } from "../../../components/table";
import { Room } from "../../../models/room";
import { rooms } from "../../../../constants/testData";
import { customerNameGenerator } from "../../../utils/generators/name";
import EditRoomModalButton from "./UpdateRoomModalButton";

export function ViewApartmentDetailModal({
  isModalVisible,
  setIsModalVisible,
}: {
  apartmentId: string;
  isModalVisible: boolean;
  setIsModalVisible: any;
}) {
  const roomListColumns: TableColumnsType<Room> = [
    {
      title: "Số phòng",
      dataIndex: "RoomId",
    },
    {
      title: "Khách hàng",
      render: (_, { CustomerId }) => {
        return <div>{customerNameGenerator(CustomerId)}</div>;
      },
    },
    {
      title: "",
      key: "actions",
      render: () => <EditRoomModalButton />,
    },
  ];

  return (
    <>
      <Modal
        title={
          <Space className="text-base">
            <HomeOutlined />
            <div className="uppercase text-secondary">
              Số phòng của chung cư
            </div>
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
      >
        <Space direction="vertical" size={20} className="w-full">
          <div className="flex justify-end">
            <AddRoomModalButton />
          </div>
          <Table
            columns={roomListColumns}
            dataSource={rooms}
            rowKey={(record) => record.RoomId}
          />
        </Space>
      </Modal>
    </>
  );
}
