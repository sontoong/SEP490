import { Modal } from "../../../../components/modals";
import { Space, TableColumnsType } from "antd";
import { PrimaryButton } from "../../../../components/buttons";
import { Table } from "../../../../components/table";
import UpdatePriceModalButton from "./UpdateRequestPriceModalButton";
import { useCallback, useEffect } from "react";
import { useSpecialUI } from "../../../../hooks/useSpecialUI";
import { useRequest } from "../../../../hooks/useRequest";
import { formatCurrency } from "../../../../utils/helpers";
import { DollarCircleOutlined } from "@ant-design/icons";

export function ViewRequestValuesModal({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: any;
}) {
  const { state: requestState, handleGetCurrentPriceOfRequest } = useRequest();
  const { state: specialUIState } = useSpecialUI();

  const fetchRooms = useCallback(() => {
    handleGetCurrentPriceOfRequest();
  }, [handleGetCurrentPriceOfRequest]);

  useEffect(() => {
    if (isModalVisible) {
      fetchRooms();
    }
  }, [fetchRooms, isModalVisible]);

  const roomListColumns: TableColumnsType = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Giá hiện tại",
      dataIndex: "value",
      render: (_, { value }) => <div>{formatCurrency(value)}</div>,
    },
    {
      title: "",
      key: "actions",
      render: (_, { value }) => <UpdatePriceModalButton oldPrice={value} />,
    },
  ];

  return (
    <>
      <Modal
        title={
          <Space className="text-base">
            <DollarCircleOutlined />
            <div className="uppercase text-secondary">Bảng giá yêu cầu</div>
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
          <Table
            columns={roomListColumns}
            dataSource={Object.keys(requestState.requestValues).map((key) => ({
              name: key,
              value: requestState.requestValues[key],
            }))}
            rowKey={(record) => record.key}
            loading={specialUIState.isLoading}
            pagination={false}
          />
        </Space>
      </Modal>
    </>
  );
}
