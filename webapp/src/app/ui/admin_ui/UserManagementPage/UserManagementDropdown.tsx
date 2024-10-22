import {
  CalendarFilled,
  EllipsisOutlined,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, MenuProps, Modal, Space } from "antd";
import { User } from "../../../models/user";
import { Avatar } from "../../../components/avatar";
import { roleNameGenerator } from "../../../utils/generators/roleName";
import { Dropdown } from "../../../components/dropdown";

const UserManagementDropdown = ({ record }: { record: User }) => {
  const [modal, contextHolder] = Modal.useModal();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem thông tin tài khoản",
      onClick: handleViewDetail,
      icon: <EyeOutlined />,
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
        <EllipsisOutlined className="text-lg" />
      </Dropdown>
      {contextHolder}
    </>
  );
};

export default UserManagementDropdown;
