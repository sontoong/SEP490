import { ConfigProvider, Tabs, TabsProps } from "antd";

function BannerTabs(props: CustomTabsProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorderSecondary: "#00000030",
          fontSize: 18,
        },
        components: {
          Tabs: {
            cardBg: "#F7F7F7",
            horizontalMargin: "0px",
          },
        },
      }}
    >
      <Tabs
        type="card"
        size="large"
        tabBarGutter={10}
        tabPosition="top"
        {...props}
      />
    </ConfigProvider>
  );
}

export default BannerTabs;

type CustomTabsProps = TabsProps;
