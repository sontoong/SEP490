import { Content } from "antd/es/layout/layout";
import React from "react";
import { useAppSelector } from "../../redux/hook";

export default function MyContent({ children }: { children: React.ReactNode }) {
  const { paths } = useAppSelector((state) => state.header);
  const currentPath = paths ? paths[paths.length - 1] : {};
  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      {currentPath.title && (
        <div className="pb-5 text-5xl font-semibold text-primary">
          {currentPath.title}
        </div>
      )}
      <main className="justify-center bg-white">{children}</main>
    </Content>
  );
}
