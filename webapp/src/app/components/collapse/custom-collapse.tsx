import { Collapse, CollapseProps, ConfigProvider, theme } from "antd";

function CustomCollapse({
    colorBorder,
    ...rest
  }: CustomCollapseProp) {
    const { token } = theme.useToken();
  
    return (
      <ConfigProvider
        theme={{
          token: {
            colorBorder: colorBorder ?? token.colorBorder,
          },
        }}
      >
        <Collapse  {...rest}/>
      </ConfigProvider>
    );
  }

  export default CustomCollapse;

  type CustomCollapseProp = Omit<CollapseProps, "style"> & {
    colorBorder?: string
  };