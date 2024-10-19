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
            headerSortActiveBg: "#52d9d7",
            headerSortHoverBg: "#52d9d7",
          },
        },
      }}
    >
      <Table {...rest} />
    </ConfigProvider>
  );
}

export default CustomTable;
