import React from "react";
import { useAppSelector } from "../../redux/hook";
import { Breadcrumb } from "../../components/breadcrumb";
import { Layout } from "antd";

const { Content } = Layout;

export default function MyContent({ children }: { children: React.ReactNode }) {
  const { paths } = useAppSelector((state) => state.header);
  const currentPath = paths ? paths[paths.length - 1] : {};
  return (
    <Content style={{ margin: "24px 20px 20px", overflow: "initial" }}>
      {paths && paths.length > 1 && (
        <Breadcrumb
          items={paths.map((path) => ({ title: path.title, path: path.path }))}
        />
      )}
      {currentPath.title && (
        <div className="pb-5 text-5xl font-semibold text-primary">
          {currentPath.title}
        </div>
      )}
      <main className="justify-center bg-white">{children}</main>
    </Content>
  );
}
