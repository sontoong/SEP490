import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown } from "../../../components/dropdown";
import { useState } from "react";
import { ViewApartmentDetailModal } from "./RoomManagement/ViewApartmentDetailModal";
import { Apartment } from "../../../models/apartment";
import UpdateApartmentModal from "./UpdateApartmentModal";

const ApartmentManagementDropdown = ({
  apartment,
}: {
  apartment: Apartment;
}) => {
  const [
    isViewApartmentDetailModalVisible,
    setIsViewApartmentDetailModalVisible,
  ] = useState<boolean>(false);
  const [isUpdateApartmentModalOpen, setIsUpdateApartmentModalOpen] =
    useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem số phòng",
      icon: <EyeOutlined />,
      onClick: () => setIsViewApartmentDetailModalVisible(true),
    },
    {
      key: "2",
      label: "Chỉnh sửa chung cư",
      icon: <EditOutlined />,
      onClick: () => setIsUpdateApartmentModalOpen(true),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <EllipsisOutlined className="text-lg" />
      </Dropdown>
      <ViewApartmentDetailModal
        apartmentId={apartment.areaId}
        isModalVisible={isViewApartmentDetailModalVisible}
        setIsModalVisible={setIsViewApartmentDetailModalVisible}
      />
      <UpdateApartmentModal
        apartment={apartment}
        isModalVisible={isUpdateApartmentModalOpen}
        setIsModalVisible={setIsUpdateApartmentModalOpen}
      />
    </>
  );
};

export default ApartmentManagementDropdown;
