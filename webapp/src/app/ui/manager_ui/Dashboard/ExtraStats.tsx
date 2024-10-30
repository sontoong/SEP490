import { Space, Statistic } from "antd";
import { Card } from "../../../components/card";
import { ArrowUpOutlined } from "@ant-design/icons";

export default function ExtraStats() {
  return (
    <div className="h-[600px] overflow-auto">
      <Space direction="vertical" className="w-full">
        <Card title="Số đơn hàng mới tháng 11">
          <Statistic
            title={<div>50 đơn hàng</div>}
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
        <Card title="Số hợp đồng mới tháng 11">
          <Statistic
            title={<div>50 hợp đồng</div>}
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Space>
    </div>
  );
}
