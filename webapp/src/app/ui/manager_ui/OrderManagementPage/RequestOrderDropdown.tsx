import {
  DropboxOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown } from "../../../components/dropdown";
import { useState } from "react";
import { ViewRequestOrderDetailModal } from "./ViewRequestOrderDetailModal";
import { useNavigate } from "react-router-dom";

const RequestOrderDropdown = ({ OrderId }: { OrderId: string }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem chi tiết khách hàng",
      icon: <EyeOutlined />,
      onClick: () => setIsModalVisible(true),
    },
    {
      key: "2",
      label: "Xem thông tin yêu cầu",
      icon: <DropboxOutlined />,
      onClick: () => navigate(`/requests/156c9368-54da-424d-984b-5ea636639854`),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <EllipsisOutlined className="text-lg" />
      </Dropdown>
      <ViewRequestOrderDetailModal
        OrderId={OrderId}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default RequestOrderDropdown;
