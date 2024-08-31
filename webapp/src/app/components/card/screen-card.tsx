import { Card, CardProps, ConfigProvider, Typography } from "antd";

const CustomScreenCard = ({ cardTitle, ...rest }: CustomScreenCardProps) => {
  const { Title } = Typography;

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#004AAD",
          },
        },
      }}
    >
      <Card
        title={
          <Title
            level={4}
            style={{
              margin: 0,
              textTransform: "uppercase",
              color: "#FFDE59",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {cardTitle}
          </Title>
        }
        {...rest}
      />
    </ConfigProvider>
  );
};

type CustomScreenCardProps = Omit<CardProps, "title"> & {
  cardTitle: string;
};

export default CustomScreenCard;
