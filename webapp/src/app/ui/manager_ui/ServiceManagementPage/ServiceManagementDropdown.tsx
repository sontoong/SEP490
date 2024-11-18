import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown } from "../../../components/dropdown";
import { ServicePackage } from "../../../models/service";
import { useState } from "react";
import UpdateServiceModal from "./UpdateServiceModal";
import ViewServicePackageDetailsModal from "./ViewServiceManagementDetailsModal";

const ServiceManagementDropdown = ({ record }: { record: ServicePackage }) => {
  const [isChangeLeaderModalOpen, setIsChangeLeaderModalOpen] = useState(false);
  const [isViewServicePackageModalOpen, setIsViewServicePackageModalOpen] =
    useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem chi tiết",
      onClick: () => setIsViewServicePackageModalOpen(true),
      icon: <EyeOutlined />,
    },
    {
      key: "2",
      label: "Chỉnh sửa",
      onClick: () => setIsChangeLeaderModalOpen(true),
      icon: <EditOutlined />,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <EllipsisOutlined className="text-lg" />
      </Dropdown>
      <UpdateServiceModal
        open={isChangeLeaderModalOpen}
        setIsModalOpen={setIsChangeLeaderModalOpen}
        record={record}
      />
      <ViewServicePackageDetailsModal
        open={isViewServicePackageModalOpen}
        setIsModalOpen={setIsViewServicePackageModalOpen}
        servicePackage={record}
      />
    </>
  );
};

export default ServiceManagementDropdown;
