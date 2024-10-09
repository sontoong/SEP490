import {
  CalendarFilled,
  EllipsisOutlined,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Divider, Dropdown, Modal, Space, Tag } from "antd";
import { MenuProps } from "antd/lib";
import { User } from "../../models/user";
import { Input } from "../../components/inputs";
import { Avatar } from "../../components/avatar";
import { roleNameGenerator } from "../../utils/generators/roleName";

const UserManagementDropdown = ({ record }: { record: User }) => {
  const [modal, contextHolder] = Modal.useModal();

  const handleViewDetail = () => {
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
  };

  const handleConfirmUnlock = () => {
    modal.confirm({
      icon: <WarningOutlined />,
      width: "fit-content",
      title: (
        <div className="flex items-center whitespace-nowrap text-sm">
          <span>Bạn có muốn đổi trạng thái thành</span>
          <Tag color="green" className="mx-1">
            Đang hoạt động
          </Tag>
          <span>?</span>
        </div>
      ),
      onOk() {},
    });
  };

  const handleConfirmLock = () => {
    modal.confirm({
      icon: <WarningOutlined />,
      width: "fit-content",
      title: (
        <div className="flex items-center whitespace-nowrap text-sm">
          <span>Bạn có muốn đổi trạng thái thành</span>
          <Tag color="volcano" className="mx-1">
            Vô hiệu hóa
          </Tag>
          <span>?</span>
        </div>
      ),
      content: (
        <Space direction="vertical" className="w-full">
          <div className="text-base text-secondary">Ghi chú</div>
          <Input.TextArea placeholder="Nhập ghi chú" />
        </Space>
      ),
      onOk() {},
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem thông tin tài khoản",
      onClick: handleViewDetail,
      icon: <EyeOutlined />,
    },
    {
      key: "2",
      label: "Mở khóa tài khoản",
      disabled: record.IsDisabled !== true,
      onClick: handleConfirmUnlock,
    },
    {
      key: "3",
      label: "Khóa tài khoản",
      disabled: record.IsDisabled !== false,
      onClick: handleConfirmLock,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <EllipsisOutlined className="text-lg" />
        </a>
      </Dropdown>
      {contextHolder}
    </>
  );
};

export default UserManagementDropdown;
