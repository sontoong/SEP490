import {
  DropboxOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown } from "../../../components/dropdown";
import { useState } from "react";
import { ViewRatingDetailModal } from "./ViewRatingDetailModal";
import { Feedback } from "../../../models/feedback";
import { useRequest } from "../../../hooks/useRequest";

const RatingManagementDropdown = ({
  feedback,
  setDrawerOpen,
}: RatingManagementDropdownProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { handleGetDetailsOfRequest } = useRequest();

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
      onClick: () => {
        if (setDrawerOpen) {
          setDrawerOpen(true);
          handleGetDetailsOfRequest({ RequestId: feedback.requestId });
        }
      },
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

type RatingManagementDropdownProps = {
  feedback: Feedback;
  setDrawerOpen?: any;
};
