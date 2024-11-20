import { Space, Statistic } from "antd";
import { Card } from "../../../components/card";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { useDashboard } from "../../../hooks/useDashboard";

export default function ExtraStats() {
  const { state } = useDashboard();

  return (
    <div className="h-[600px] overflow-auto">
      <Space direction="vertical" className="w-full">
        {state.isFetching ? (
          <Card loading />
        ) : (
          state.extraStats.map((item, index) => {
            let color;
            let prefix;

            if (item.change > 0) {
              color = "#3f8600";
              prefix = <ArrowUpOutlined />;
            } else if (item.change < 0) {
              color = "#cf1322";
              prefix = <ArrowDownOutlined />;
            } else {
              color = "#595959";
              prefix = <MinusOutlined />;
            }

            return (
              <Card
                key={index}
                title={`${item.name} mới tháng ${new Date().getMonth() + 1}`}
              >
                <Statistic
                  title={<div>{`${item.currentMonthCount} ${item.name}`}</div>}
                  value={item.change}
                  precision={2}
                  valueStyle={{ color: color }}
                  prefix={prefix}
                  suffix="%"
                />
              </Card>
            );
          })
        )}
      </Space>
    </div>
  );
}
