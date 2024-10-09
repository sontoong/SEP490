import { Content } from "antd/es/layout/layout";
import React from "react";
import { useAppSelector } from "../../redux/hook";

export default function MyContent({ children }: { children: React.ReactNode }) {
  const { headerTitle } = useAppSelector((state) => state.header);
  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      {headerTitle.title && (
        <div className="pb-5 text-5xl font-semibold uppercase text-primary">
          {headerTitle.title}
        </div>
      )}
      <main className="justify-center bg-white">{children}</main>
    </Content>
  );
}
