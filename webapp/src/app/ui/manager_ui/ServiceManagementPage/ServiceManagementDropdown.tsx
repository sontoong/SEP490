import {
  BarChartOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Dropdown } from "../../../components/dropdown";
import { ServicePackage } from "../../../models/service";
import { useState } from "react";
import UpdateServiceModal from "./UpdateServiceModal";
import ViewServicePackageDetailsModal from "./ViewServicePackageDetailsModal";
import ViewServicePackageStatisticsModal from "./ViewServicePackageStatisticsModal";

const ServiceManagementDropdown = ({
  record,
  fetchServicePackage,
}: {
  record: ServicePackage;
  fetchServicePackage: any;
}) => {
  const [isChangeLeaderModalOpen, setIsChangeLeaderModalOpen] = useState(false);
  const [
    isViewServicePackageStatisticsModalOpen,
    setIsViewServicePackageStatisticsModalOpen,
  ] = useState(false);
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
    {
      key: "3",
      label: "Xem thống kê",
      onClick: () => setIsViewServicePackageStatisticsModalOpen(true),
      icon: <BarChartOutlined />,
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
        fetchServicePackage={fetchServicePackage}
      />
      <ViewServicePackageDetailsModal
        open={isViewServicePackageModalOpen}
        setIsModalOpen={setIsViewServicePackageModalOpen}
        servicePackage={record}
      />
      <ViewServicePackageStatisticsModal
        open={isViewServicePackageStatisticsModalOpen}
        setIsModalOpen={setIsViewServicePackageStatisticsModalOpen}
        servicePackage={record}
      />
    </>
  );
};

export default ServiceManagementDropdown;
