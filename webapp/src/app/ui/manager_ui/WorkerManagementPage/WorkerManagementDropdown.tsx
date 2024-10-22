import {
  CalendarFilled,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, MenuProps, Modal, Space } from "antd";
import { Avatar } from "../../../components/avatar";
import { Dropdown } from "../../../components/dropdown";
import { Worker } from "../../../models/user";
import { useState } from "react";
import ChangeLeaderModal from "./ChangeLeaderModal";

const WorkerManagementDropdown = ({ record }: { record: Worker }) => {
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
      label: "Giao cho Leader",
      onClick: () => setIsChangeLeaderModalOpen(true),
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
              <strong>Leader:</strong>{" "}
              {record.LeaderId ? record.LeaderId : "N/A"}
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
        <EllipsisOutlined className="text-lg" />
      </Dropdown>
      <ChangeLeaderModal
        open={isChangeLeaderModalOpen}
        setIsModalOpen={setIsChangeLeaderModalOpen}
      />
      {contextHolder}
    </>
  );
};

export default WorkerManagementDropdown;
