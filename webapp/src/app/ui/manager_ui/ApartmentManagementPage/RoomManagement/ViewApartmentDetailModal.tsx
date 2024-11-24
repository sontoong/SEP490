import { HomeOutlined } from "@ant-design/icons";
import { Modal } from "../../../../components/modals";
import { Space, TableColumnsType } from "antd";
import { PrimaryButton } from "../../../../components/buttons";
import AddRoomModalButton from "./AddRoomModalButton";
import { Table } from "../../../../components/table";
import { Room } from "../../../../models/room";
import { customerNameGenerator } from "../../../../utils/generators/name";
import EditRoomModalButton from "./UpdateRoomModalButton";
import { useCallback, useEffect } from "react";
import { useApartment } from "../../../../hooks/useApartment";
import { useSpecialUI } from "../../../../hooks/useSpecialUI";
import { usePagination } from "../../../../hooks/usePagination";

export function ViewApartmentDetailModal({
  apartmentId,
  isModalVisible,
  setIsModalVisible,
}: {
  apartmentId: string;
  isModalVisible: boolean;
  setIsModalVisible: any;
}) {
  const { state: apartmentState, handleGetAllRoomsPaginated } = useApartment();
  const { state: specialUIState } = useSpecialUI();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();

  const fetchRooms = useCallback(() => {
    handleGetAllRoomsPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      AreaId: apartmentId,
    });
  }, [apartmentId, currentPage, currentPageSize, handleGetAllRoomsPaginated]);

  useEffect(() => {
    if (isModalVisible) {
      fetchRooms();
    }
  }, [fetchRooms, isModalVisible]);

  const roomListColumns: TableColumnsType<Room> = [
    {
      title: "Số phòng",
      dataIndex: "roomId",
    },
    {
      title: "Khách hàng",
      render: (_, { customer }) => {
        return <div>{customerNameGenerator(customer)}</div>;
      },
    },
    {
      title: "",
      key: "actions",
      render: (_, { areaId, roomId }) => (
        <EditRoomModalButton areaId={areaId} oldRoomId={roomId} />
      ),
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
            <AddRoomModalButton apartmentId={apartmentId} />
          </div>
          <Table
            columns={roomListColumns}
            dataSource={apartmentState.currentRoomList.rooms}
            rowKey={(record) => record.roomId}
            loading={specialUIState.isLoading}
            pagination={{
              total: apartmentState.currentRoomList.total,
              pageSize: currentPageSize,
              current: currentPage,
              onChange: (pageIndex, pageSize) => {
                goToPage(pageIndex);
                setPageSize(pageSize);
              },
            }}
          />
        </Space>
      </Modal>
    </>
  );
}