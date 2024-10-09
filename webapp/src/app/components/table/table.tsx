import { ConfigProvider, Table, TableProps } from "antd";

function CustomTable({ ...rest }: TableProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 17,
        },
        components: {
          Table: {
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
