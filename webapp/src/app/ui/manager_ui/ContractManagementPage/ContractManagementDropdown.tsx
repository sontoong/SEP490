import {
  CalendarFilled,
  DownloadOutlined,
  EllipsisOutlined,
  EyeOutlined,
  MailFilled,
  PhoneFilled,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps, Modal, Space } from "antd";
import { Avatar } from "../../../components/avatar";
import { Dropdown } from "../../../components/dropdown";
import { Contract } from "../../../models/contract";
import { Grid } from "../../../components/grids";
import { formatDateToLocal } from "../../../utils/helpers";

const ContractManagementDropdown = ({ record }: { record: Contract }) => {
  const [modal, contextHolder] = Modal.useModal();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Xem chi tiết khách hàng",
      onClick: handleViewDetail,
      icon: <EyeOutlined />,
    },
    {
      key: "2",
      label: "Tải hợp đồng",
      onClick: () => {
        window.open(record.item.fileUrl);
      },
      icon: <DownloadOutlined />,
    },
  ];

  function handleViewDetail() {
    modal.info({
      icon: <UserOutlined />,
      width: 750,
      title: (
        <div className="text-sm uppercase text-secondary">
          Thông tin của {record.getCusInfo[0].fullName}
        </div>
      ),
      content: (
        <Grid
          className="text-sm"
          items={[
            <Space direction="vertical" size={10}>
              <Avatar src={record.getCusInfo[0].avatarUrl} size={150} />
              <div>
                <strong>Họ và Tên:</strong> {record.getCusInfo[0].fullName}
              </div>
              <div>
                <strong>CCCD: </strong>
                {record.getCusInfo[0].customers.cmT_CCCD}
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
                    <span>{record.getCusInfo[0].phoneNumber}</span>
                  </Space>
                </div>
                <div>
                  <Space direction="horizontal" size={3}>
                    <CalendarFilled />
                    <strong>Ngày sinh:</strong>
                    <span>
                      {formatDateToLocal(record.getCusInfo[0].dateOfBirth)}
                    </span>
                  </Space>
                </div>
                <div>
                  <Space direction="horizontal" size={3}>
                    <MailFilled />
                    <strong>Email:</strong>
                    <span>{record.getCusInfo[0].email}</span>
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
      {contextHolder}
    </>
  );
};

export default ContractManagementDropdown;
