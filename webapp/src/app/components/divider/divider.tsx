import { ConfigProvider, Divider, DividerProps, theme } from "antd";

const CustomDivider = ({colorSplit, ...rest} : CustomDividerProps) => {
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
            colorSplit: colorSplit ?? token.colorSplit
        },
      }}
    >
      <Divider {...rest}/>
    </ConfigProvider>
  );
};

type CustomDividerProps = DividerProps & {
    colorSplit: string;
  };

export default CustomDivider;
