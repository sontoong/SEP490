import {
  DropboxOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown } from "../../../components/dropdown";
import { useState } from "react";
import { ViewRequestOrderDetailsModal } from "./ViewRequestOrderDetailsModal";
import { RequestOrder } from "../../../models/order";

const RequestOrderDropdown = ({
  requestOrder,
  setOpen,
  setRequestOrderId,
}: {
  requestOrder: RequestOrder;
  setOpen: any;
  setRequestOrderId: () => void;
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem chi tiết đơn hàng",
      icon: <EyeOutlined />,
      onClick: () => setIsModalVisible(true),
    },
    {
      key: "2",
      label: "Xem thông tin yêu cầu",
      icon: <DropboxOutlined />,
      onClick: () => {
        setRequestOrderId();
        window.scrollTo(0, 0);
        setOpen(true);
      },
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <EllipsisOutlined className="text-lg" />
      </Dropdown>
      <ViewRequestOrderDetailsModal
        requestOrder={requestOrder}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default RequestOrderDropdown;
