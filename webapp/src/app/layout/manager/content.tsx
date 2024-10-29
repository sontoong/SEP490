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
        <div className="pb-3">
          <Breadcrumb
            items={paths.map((path) => ({
              title: path.title,
              path: path.path,
            }))}
          />
        </div>
      )}
      {currentPath.title && (
        <div className="pb-10 text-5xl font-semibold text-primary">
          {currentPath.title}
        </div>
      )}
      <main className="justify-center bg-white">{children}</main>
    </Content>
  );
}
