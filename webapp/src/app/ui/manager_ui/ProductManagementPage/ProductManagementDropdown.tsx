import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { useState } from "react";
import { Dropdown } from "../../../components/dropdown";
import { Product } from "../../../models/product";
import UpdateProductModal from "./UpdateProductModal";
import ViewProductDetailsModal from "./ViewProductDetailsModal";

const ProductManagementDropdown = ({ record }: { record: Product }) => {
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] =
    useState(false);
  const [isViewProductModalOpen, setIsViewProductModalOpen] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem chi tiết",
      onClick: () => setIsViewProductModalOpen(true),
      icon: <EyeOutlined />,
    },
    {
      key: "2",
      label: "Chỉnh sửa",
      onClick: () => setIsUpdateProductModalOpen(true),
      icon: <EditOutlined />,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <EllipsisOutlined className="text-lg" />
      </Dropdown>
      <UpdateProductModal
        open={isUpdateProductModalOpen}
        setIsModalOpen={setIsUpdateProductModalOpen}
        product={record}
      />
      <ViewProductDetailsModal
        open={isViewProductModalOpen}
        setIsModalOpen={setIsViewProductModalOpen}
        product={record}
      />
    </>
  );
};

export default ProductManagementDropdown;
