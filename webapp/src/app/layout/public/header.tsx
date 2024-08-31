import {
  BookOutlined,
  HistoryOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, MenuProps, Modal, Spin } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { ROLE } from "../../../constants/role";
import { PrimaryButton } from "../../components/buttons";
import { useAuth } from "../../hooks/useAuth";
import { ensureBase64Avatar, isEmptyObject } from "../../utils/helpers";

const { Header } = Layout;

export default function MyHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, handleLogout } = useAuth();

  const logOut = () => {
    handleLogout();
  };

  function getHeader(): ItemType[] {
    switch (state.currentUser.Role) {
      case ROLE.admin:
        return [
          generateItem("Cities", "/cities", ""),
          generateItem("Tours", "/tours"),
          generateItem("Guides", "/guides"),
        ];
      default:
        return [
          generateItem("Cities", "/cities"),
          generateItem("Tours", "/tours"),
          generateItem("Guides", "/guides"),
        ];
    }
  }

  function getProfileDropdown(): ItemType[] {
    switch (state.currentUser.Role) {
      case ROLE.admin:
        return [
          generateItemProfile(
            "Thông tin cá nhân",
            "/customer/profile",
            <UserOutlined />,
          ),
          generateItemProfile(
            "Danh sách chờ",
            "/customer/request",
            <BookOutlined />,
          ),
          generateItemProfile(
            "Giao dịch",
            "/customer/payment-history",
            <HistoryOutlined />,
          ),
          {
            type: "divider",
          },
          generateItemProfile(
            "Đăng xuất",
            "",
            <LogoutOutlined />,
            undefined,
            logOut,
          ),
        ];
      default:
        return [
          generateItemProfile(
            "Đăng xuất",
            "",
            <LogoutOutlined />,
            undefined,
            logOut,
          ),
        ];
    }
  }

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key) {
      navigate(e.key);
    }
  };

  return (
    <>
      <Header className="sticky top-0 z-50 flex w-full  items-center bg-white">
        <img
          alt=""
          className="w-[150px] hover:cursor-pointer"
          onClick={() => navigate("/")}
          src={logo}
        />
        <Menu
          mode="horizontal"
          items={getHeader()}
          style={{
            flex: 1,
            minWidth: 0,
            borderBottom: "none",
          }}
          selectedKeys={location.pathname
            .split("/")
            .slice(1)
            .map((_, index, arr) => `/${arr.slice(0, index + 1).join("/")}`)}
          onClick={onClick}
        />
        {isEmptyObject(state.currentUser) ? (
          <PrimaryButton
            text="Get started"
            className="self-center rounded-full"
            bgColor="#000000"
            size="middle"
            onClick={() => navigate("/login")}
          />
        ) : (
          <Dropdown
            menu={{
              items: getProfileDropdown(),
              selectedKeys: location.pathname
                .split("/")
                .slice(1)
                .map(
                  (_, index, arr) => `/${arr.slice(0, index + 1).join("/")}`,
                ),
              onClick: onClick,
            }}
            placement="bottomRight"
            trigger={["click"]}
            arrow
          >
            <Avatar
              className="fixed right-4 top-3 cursor-pointer"
              size={"large"}
              icon={<UserOutlined />}
              src={ensureBase64Avatar(state.currentUser?.Email)} //fix this
            />
          </Dropdown>
        )}
      </Header>
      <Modal footer={null} closable={false} open={state.isFetching}>
        <div className="flex flex-col items-center justify-center">
          <Spin size="large"></Spin>
          <span>Đang đăng xuất...</span>
        </div>
      </Modal>
    </>
  );
}

function generateItem(
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  children?: ItemType[],
): ItemType {
  return {
    key,
    icon,
    children,
    label: <span className="text-lg font-bold">{label}</span>,
  };
}

function generateItemProfile(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: ItemType[],
  onClick?: () => void,
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}
