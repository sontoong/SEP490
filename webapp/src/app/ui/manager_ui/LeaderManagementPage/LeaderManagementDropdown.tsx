import {
  CalendarFilled,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps, Modal, Space } from "antd";
import { Avatar } from "../../../components/avatar";
import { Dropdown } from "../../../components/dropdown";
import { Leader } from "../../../models/user";
import { useState } from "react";
import ChangeApartmentAreaModal from "./ChangeApartmentAreaModal";
import { Grid } from "../../../components/grids";

const LeaderManagementDropdown = ({ record }: { record: Leader }) => {
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
      width: 700,
      title: (
        <div className="text-sm uppercase text-secondary">
          Thông tin của {record.Fullname}
        </div>
      ),
      content: (
        <Grid
          className="text-sm"
          items={[
            <Space direction="vertical" size={10}>
              <Avatar src={record.AvatarUrl} size={70} />
              <div>
                <strong>Họ và Tên:</strong> {record.Fullname}
              </div>
              <div>
                <strong>Chung cư:</strong>
                {record.ApartmentAreaName ? record.ApartmentAreaName : "N/A"}
              </div>
            </Space>,
            <Space direction="vertical" size={15}>
              <div className="text-lg font-bold uppercase">
                Thông tin cá nhân
              </div>
              <Space direction="vertical" size={10}>
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
            </Space>,
          ]}
        />
      ),
      onOk() {},
    });
  }

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <EllipsisOutlined className="text-lg" />
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
