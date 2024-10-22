import { Tag } from "antd";

export function requestStatusGenerator(status?: number) {
  switch (status) {
    case 1:
      return <Tag color="orange">Yêu cầu mới</Tag>;
    case 2:
      return <Tag color="lime">Đang xử lý</Tag>;
    case 3:
      return <Tag color="green">Đã xử lý</Tag>;
    case 4:
      return <Tag color="volcano">Đã hủy</Tag>;
    default:
      return <Tag>Unknown</Tag>;
  }
}

export function requestTypeGenerator(categoryRequest?: number) {
  switch (categoryRequest) {
    case 1:
      return <Tag color="volcano">Tính phí</Tag>;
    case 2:
      return <Tag color="green">Miễn phí</Tag>;
    default:
      return "Unknown";
  }
}
