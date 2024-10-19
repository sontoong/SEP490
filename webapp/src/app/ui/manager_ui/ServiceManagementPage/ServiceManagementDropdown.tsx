import {
  BookOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Divider, Modal, Space } from "antd";
import { MenuProps } from "antd/lib";
import { Avatar } from "../../../components/avatar";
import { Dropdown } from "../../../components/dropdown";
import { ServicePackage } from "../../../models/service";
import { useState } from "react";
import UpdateServiceModal from "./UpdateServiceModal";
import { formatCurrency } from "../../../utils/helpers";
import htmlParse from "../../../utils/htmlParser";

const ServiceManagementDropdown = ({ record }: { record: ServicePackage }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [isChangeLeaderModalOpen, setIsChangeLeaderModalOpen] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem chi tiết",
      onClick: handleViewDetail,
      icon: <EyeOutlined />,
    },
    {
      key: "2",
      label: "Chỉnh sửa",
      onClick: () => setIsChangeLeaderModalOpen(true),
      icon: <EditOutlined />,
    },
  ];

  function handleViewDetail() {
    modal.info({
      icon: <BookOutlined />,
      width: "fit-content",
      className: "max-w-[750px]",
      title: (
        <div>
          <div className="text-sm uppercase text-secondary">
            Thông tin {record.Name}
          </div>
          <div className="text-xs text-gray-400">
            #{record.ServicePackageId}
          </div>
        </div>
      ),
      content: (
        <Space direction="vertical" className="w-full text-sm">
          <Space direction="vertical" size={5} className="w-full">
            <Avatar src={record.ImageUrl} size={70} shape="square" />
            <div className="text-lg font-bold">{record.Name}</div>
            <Space className="flex w-full justify-between">
              <div>
                <span className="font-bold">Số lần sửa: </span>
                {record.NumOfRequest}
              </div>
              <div>
                <span className="font-bold">Giá gói: </span>
                {formatCurrency(record.ServicePackagePrices.PriceByDate)}
              </div>
            </Space>
          </Space>
          <Divider type="horizontal" className="bg-black" />
          <Space direction="vertical" size={5}>
            <div className="text-lg font-bold uppercase">Chính sách</div>
            <div>{htmlParse(record.Policy)}</div>
          </Space>
        </Space>
      ),
      okText: "Đóng",
      onOk() {},
    });
  }

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
      {contextHolder}
    </>
  );
};

export default ServiceManagementDropdown;
