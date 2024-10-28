import { Space } from "antd";
import { useTitle } from "../../hooks/useTitle";
import {
  requestStatusGenerator,
  requestTypeGenerator,
} from "../../utils/generators/requestStatus";
import { requests, users } from "../../../constants/testData";
import { useParams } from "react-router-dom";
import { formatCurrency, formatDateToLocal } from "../../utils/helpers";
import { Avatar } from "../../components/avatar";
import { DownloadOutlined, PhoneFilled } from "@ant-design/icons";
import { Collapse } from "../../components/collapse";
import WorkerTable from "../../ui/manager_ui/RequestDetailsPage/WorkerTable";
import { PrimaryButton } from "../../components/buttons";
import RequestProductList from "../../ui/manager_ui/RequestDetailsPage/RequestProductList";

export default function RequestDetailsPage() {
  useTitle({
    tabTitle: "Requests - EWMH",
    paths: [
      { title: "Danh sách yêu cầu", path: "/requests" },
      { title: "Thông tin yêu cầu" },
    ],
  });
  const { requestId } = useParams();
  const request = requests.find((value) => value.RequestId === requestId);
  const customer = users.find(
    (value) => value.AccountId === request?.CustomerId,
  );

  const totalPrice = request?.RequestDetails.map((product) => {
    if (product.isCustomerPaying) {
      return 100 * product.Quantity;
    } else {
      return 0;
    }
  }).reduce((a, b) => a + b, 0);
  console.log(totalPrice);

  return (
    <Space direction="vertical" size={20} className="w-full">
      <Space direction="vertical" className="w-full text-sm">
        <div>
          <span className="font-bold">Mã số yêu cầu: </span>
          <span>{request?.RequestId}</span>
        </div>
        <div>
          <span className="font-bold">Trạng thái: </span>
          <span>{requestStatusGenerator(request?.Status)}</span>
        </div>
        <div>
          <span className="font-bold">Loại yêu cầu: </span>
          <span>{requestTypeGenerator(request?.CategoryRequest)}</span>
        </div>
        <div>
          <span className="font-bold">Ngày bắt đầu: </span>
          <span>{formatDateToLocal(request?.Start)}</span>
        </div>
        <div>
          <span className="font-bold">Leader: </span>
          <span>{request?.LeaderId}</span>
        </div>
        <span className="font-bold">Khách hàng:</span>
        <Space direction="vertical" className="w-full">
          <div className="w-full rounded-lg border-2 border-solid border-secondary px-3 py-2">
            <Avatar size={75} src={customer?.AvatarUrl} />
            <div className="font-bold">{customer?.Fullname}</div>
            <Space size={50}>
              <div>
                <span className="font-bold">Email: </span>
                <span>{customer?.Email}</span>
              </div>
              <div>
                <span className="font-bold">Chung cư: </span>
                <span>{customer?.ApartmentAreaName}</span>
              </div>
              <div>
                <span className="font-bold">Phòng: </span>
                <span>{customer?.RoomId}</span>
              </div>
              <div>
                <Space>
                  <PhoneFilled />
                  <span className="font-bold">SĐT: </span>
                </Space>
                <span>{customer?.PhoneNumber}</span>
              </div>
            </Space>
          </div>
        </Space>
      </Space>
      <Collapse
        items={[
          {
            label: "Danh sách nhân viên",
            children: <WorkerTable />,
          },
        ]}
        fontSize={18}
      />
      <div className="text-sm">
        <div className="font-bold">Mô tả vấn đề của khách hàng: </div>
        <div>{request?.CustomerProblem}</div>
      </div>
      {request?.Conclusion && (
        <div className="text-sm">
          <div className="font-bold">Kết luận của nhân viên: </div>
          <div>{request?.Conclusion}</div>
        </div>
      )}
      <PrimaryButton
        text="Tải hóa đơn"
        icon={<DownloadOutlined />}
        className="w-full"
      />
      <Collapse
        items={[
          {
            label: "Đơn hàng của yêu cầu",
            children: <RequestProductList />,
            forceRender: true,
          },
        ]}
        fontSize={18}
      />
      <Space className="flex justify-between text-sm">
        <div className="font-bold">Giá gửi yêu cầu: </div>
        <div className="font-semibold">
          {formatCurrency(request?.PriceRequests[0].PriceByDate)}
        </div>
      </Space>
      <Space className="flex justify-between text-sm">
        <div className="font-bold">Tổng giá: </div>
        <div className="font-bold">
          {formatCurrency(request?.TotalPrice)}
        </div>
      </Space>
    </Space>
  );
}
