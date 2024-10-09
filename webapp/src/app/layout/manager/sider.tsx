import {
  MenuOutlined,
  FundOutlined,
  SolutionOutlined,
  TeamOutlined,
  BookOutlined,
  ToolOutlined,
  FileTextOutlined,
  DropboxOutlined,
  ShoppingCartOutlined,
  WechatOutlined,
  LikeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { cn } from "../../utils/cn";
import logo from "../../../assets/images/logo.png";
import logo2 from "../../../assets/images/logo2.png";

type MenuItem = Required<MenuProps>["items"][number];

export default function MySider() {
  const select = useLocation();
  const { state } = useAuth();

  const selected = select.pathname.split("/")[1];
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getConditionalItems = (): MenuItem[] => {
    switch (state.currentUser.Role) {
      case "2":
        return [
          getItem("Thống kê", "dashboard", <FundOutlined />),
          getItem("Leader", "leader-manage", <SolutionOutlined />),
          getItem("Nhân viên", "classes", <TeamOutlined />),
          getItem("Gói dịch vụ", "classes", <BookOutlined />),
          getItem("Sản phẩm", "classes", <ToolOutlined />),
          getItem("Hợp đồng", "classes", <FileTextOutlined />),
          getItem("Yêu cầu", "classes", <DropboxOutlined />),
          getItem("Đơn hàng", "classes", <ShoppingCartOutlined />),
          getItem("Chat", "classes", <WechatOutlined />),
          getItem("Đánh giá", "classes", <LikeOutlined />),
          getItem("Chung cư", "classes", <HomeOutlined />),
        ];
      default:
        return [];
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="sticky bottom-0 top-0 h-screen overflow-auto"
      trigger={
        <div className="w-full border-r-[1px] border-t-[1px]">
          <MenuOutlined />
        </div>
      }
      width={256}
    >
      <div className="flex justify-center border-r-[1px] border-gray-200">
        <div
          className={cn("flex items-center gap-3", {
            hidden: collapsed,
          })}
        >
          <img src={logo2} alt="logo" className="max-w-[50px] py-2" />
          <img src={logo} alt="logo" className="max-w-[100px] py-2" />
        </div>
        <img
          src={logo2}
          alt="logo"
          className={cn("max-w-[50px] py-2", {
            hidden: !collapsed,
          })}
        />
      </div>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
          },
          components: {
            Menu: {
              itemBg: "#1EA19F",
              itemColor: "#fff",
              itemHoverColor: "#fff",
              itemActiveBg: "#FF7A00",
              itemSelectedBg: "#FF7A00",
              itemSelectedColor: "#fff",
            },
          },
        }}
      >
        <Menu
          defaultSelectedKeys={[selected]}
          mode="inline"
          items={getConditionalItems()}
        />
      </ConfigProvider>
    </Sider>
  );
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label: <Link to={`/${key}`}>{label}</Link>,
  } as MenuItem;
}
