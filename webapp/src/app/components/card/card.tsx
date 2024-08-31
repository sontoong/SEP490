import { Card, CardProps, Typography } from "antd";

const { Title, Paragraph } = Typography;

const CustomCard = ({ title, description, ...rest }: CustomCardProps) => {
  return (
    <Card {...rest}>
      <Title level={2} className="mt-0" ellipsis={{ rows: 2 }}>
        {title}
      </Title>
      <Paragraph ellipsis={{ rows: 3, expandable: false }}>
        {description}
      </Paragraph>
    </Card>
  );
};

export default CustomCard;

type CustomCardProps = CardProps & {
  title?: string;
  description?: string;
};
