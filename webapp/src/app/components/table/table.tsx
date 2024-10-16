import { ConfigProvider, Table, TableProps } from "antd";

function CustomTable({ ...rest }: TableProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellFontSize: 17,
            headerBg: "#4CC9C7",
            headerColor: "#fff",
          },
        },
      }}
    >
      <Table {...rest} />
    </ConfigProvider>
  );
}

export default CustomTable;
