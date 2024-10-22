import { ConfigProvider, Table, TableProps } from "antd";

function CustomTable({ fontSize, ...rest }: CustomTableProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellFontSize: fontSize ?? 17,
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

type CustomTableProps = TableProps & {
  fontSize?: number;
};
