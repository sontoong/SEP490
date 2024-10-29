import {
  DropboxOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown } from "../../../components/dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewRatingDetailModal } from "./ViewRatingDetailModal";
import { Feedback } from "../../../models/feedback";

const RatingManagementDropdown = ({ feedback }: { feedback: Feedback }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem thông tin đánh giá",
      icon: <EyeOutlined />,
      onClick: () => setIsModalVisible(true),
    },
    {
      key: "2",
      label: "Xem thông tin yêu cầu",
      icon: <DropboxOutlined />,
      onClick: () => navigate(`/requests/${feedback.RequestId}`),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <EllipsisOutlined className="text-lg" />
      </Dropdown>
      <ViewRatingDetailModal
        feedback={feedback}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default RatingManagementDropdown;
