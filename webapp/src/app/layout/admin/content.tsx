import { Content } from "antd/es/layout/layout";
import React from "react";
// import { useAppSelector } from "../../redux/hook";

export default function MyContent({ children }: { children: React.ReactNode }) {
  //   const { headerTitle } = useAppSelector((state) => state.header);
  //   const currentHeader = headerTitle[headerTitle.length - 1];
  return (
    <Content>
      {/* {currentHeader.title && (
        <div className="pb-5 text-xl uppercase">{currentHeader.title}</div>
      )} */}
      <main className="h-full justify-center bg-white">{children}</main>
    </Content>
  );
}
