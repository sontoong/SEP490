import {
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { MenuProps, Modal, Space } from "antd";
import { useState } from "react";
import { Avatar } from "../../../components/avatar";
import { Dropdown } from "../../../components/dropdown";
import { Product } from "../../../models/product";
import { formatCurrency } from "../../../utils/helpers";
import UpdateProductModal from "./UpdateProductModal";

const ProductManagementDropdown = ({ record }: { record: Product }) => {
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
      icon: <ToolOutlined />,
      width: "fit-content",
      className: "max-w-[750px]",
      title: (
        <div>
          <div className="text-sm uppercase text-secondary">
            Thông tin {record.Name}
          </div>
        </div>
      ),
      content: (
        <Space direction="vertical" className="w-full text-sm">
          <Space direction="vertical" size={5} className="w-full">
            <Avatar src={record.ImageUrl} size={70} shape="square" />
            <div className="text-lg font-bold">{record.Name}</div>
            <Space size={25} className="flex w-full justify-between">
              <div>
                <span className="font-bold">Giá hiện tại: </span>
                {formatCurrency(record.ProductPrices.PriceByDate)}
              </div>
              <div>
                <span className="font-bold">Số lượng: </span>
                {record.In_Of_stock}
              </div>
              <div>
                <span className="font-bold">Bảo hành: </span>
                {record.WarrantyMonths} tháng
              </div>
            </Space>
          </Space>
          <Space direction="vertical" size={5}>
            <div>{record.Description}</div>
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
      <UpdateProductModal
        open={isChangeLeaderModalOpen}
        setIsModalOpen={setIsChangeLeaderModalOpen}
        record={record}
      />
      {contextHolder}
    </>
  );
};

export default ProductManagementDropdown;
