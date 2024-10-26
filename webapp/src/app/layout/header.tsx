import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, MenuProps, Modal, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ROLE } from "../../constants/role";
import { PrimaryButton } from "../components/buttons";
import { useAuth } from "../hooks/useAuth";
import { ensureBase64Avatar } from "../utils/helpers";
import { isLoggedIn } from "../redux/slice/authSlice";

const { Header } = Layout;

export default function CustomHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, handleLogout } = useAuth();

  const logOut = () => {
    handleLogout();
  };

  function getHeaderItems(): MenuItem[] {
    switch (state.currentUser.Role) {
      case ROLE.admin:
        return [];
      case ROLE.manager:
        return [];
      default:
        return [];
    }
  }

  function getProfileDropdown(): MenuItem[] {
    switch (state.currentUser.Role) {
      case ROLE.admin:
        return [
          generateItemProfile("Đăng xuất", "", <LogoutOutlined />, logOut),
        ];
      case ROLE.manager:
        return [
          generateItemProfile("Đăng xuất", "", <LogoutOutlined />, logOut),
        ];
      default:
        return [
          generateItemProfile("Đăng xuất", "", <LogoutOutlined />, logOut),
        ];
    }
  }

  return (
    <>
      <Header className="sticky top-0 z-50 flex w-full items-center">
        <img
          alt=""
          className="w-[150px] hover:cursor-pointer"
          onClick={() => navigate("/")}
          src={logo}
        />
        <Menu
          mode="horizontal"
          items={getHeaderItems()}
          style={{
            flex: 1,
            minWidth: 0,
            borderBottom: "none",
          }}
          selectedKeys={location.pathname
            .split("/")
            .slice(1)
            .map((_, index, arr) => `/${arr.slice(0, index + 1).join("/")}`)}
        />
        {!isLoggedIn() ? (
          <PrimaryButton
            text="Đăng nhập"
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
            }}
            placement="bottomRight"
            trigger={["click"]}
            arrow
          >
            <Avatar
              className="fixed right-4 top-3 cursor-pointer"
              size={"large"}
              icon={<UserOutlined />}
              src={ensureBase64Avatar(state.currentUser.AvatarUrl)}
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

// function generateItemHeader(
//   label: string,
//   key: React.Key,
//   icon?: React.ReactNode,
//   onClick?: () => void,
//   children?: ItemType[],
// ): ItemType {
//   return {
//     key,
//     icon,
//     children,
//     label: <span className="text-lg font-bold">{label}</span>,
//     onClick,
//   };
// }

function generateItemProfile(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?: () => void,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

type MenuItem = Required<MenuProps>["items"][number];
