import { Tag } from "antd";

export function contractStatusGenerator(remaining: number) {
  if (remaining === 0) {
    return <Tag color="volcano">Hết hiệu lực</Tag>;
  } else if (remaining > 0) {
    return <Tag color="green">Đang hoạt động</Tag>;
  } else {
    return <Tag>Unknown</Tag>;
  }
}
