import {
  CalendarFilled,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Modal, Space } from "antd";
import { MenuProps } from "antd/lib";
import { Avatar } from "../../../components/avatar";
import { roleNameGenerator } from "../../../utils/generators/roleName";
import { Dropdown } from "../../../components/dropdown";
import { User } from "../../../models/user";
import { useState } from "react";
import ChangeApartmentAreaModal from "./ChangeApartmentAreaModal";

const LeaderManagementDropdown = ({ record }: { record: User }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [isChangeApartmentAreaModalOpen, setIsChangeApartmentAreaModalOpen] =
    useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem chi tiết",
      onClick: handleViewDetail,
      icon: <EyeOutlined />,
    },
    {
      key: "2",
      label: "Đổi chung cư",
      onClick: () => setIsChangeApartmentAreaModalOpen(true),
      icon: <EditOutlined />,
    },
  ];

  function handleViewDetail() {
    modal.info({
      icon: <UserOutlined />,
      width: "fit-content",
      title: (
        <div className="text-sm uppercase text-secondary">
          Thông tin của {record.Fullname}
        </div>
      ),
      content: (
        <Space direction="horizontal" className="w-full">
          <Space direction="vertical" size={5}>
            <Avatar src={record.AvatarUrl} size={70} />
            <div>
              <strong>Họ và Tên:</strong> {record.Fullname}
            </div>
            <div>
              <strong>Vai trò:</strong> {roleNameGenerator(record.Role)}
            </div>
          </Space>
          <Divider type="vertical" className="h-[150px] bg-black" />
          <Space direction="vertical" size={15}>
            <div className="text-lg font-bold uppercase">Thông tin cá nhân</div>
            <Space direction="vertical" size={5}>
              <div>
                <Space direction="horizontal" size={3}>
                  <PhoneFilled />
                  <strong>SĐT:</strong>
                  <span>{record.Fullname}</span>
                </Space>
              </div>
              <div>
                <Space direction="horizontal" size={3}>
                  <CalendarFilled />
                  <strong>Ngày sinh:</strong>
                  <span>{record.DateOfBirth}</span>
                </Space>
              </div>
              <div>
                <Space direction="horizontal" size={3}>
                  <MailFilled />
                  <strong>Email:</strong>
                  <span>{record.Email}</span>
                </Space>
              </div>
            </Space>
          </Space>
        </Space>
      ),
      onOk() {},
    });
  }

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <EllipsisOutlined className="text-lg" />
        </a>
      </Dropdown>
      <ChangeApartmentAreaModal
        open={isChangeApartmentAreaModalOpen}
        setIsModalOpen={setIsChangeApartmentAreaModalOpen}
      />
      {contextHolder}
    </>
  );
};

export default LeaderManagementDropdown;
