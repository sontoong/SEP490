import { Space } from "antd";
import { Request } from "../../../../models/request";
import {
  requestStatusGenerator,
  requestTypeGenerator,
} from "../../../../utils/generators/requestStatus";
import { formatCurrency, formatDateToLocal } from "../../../../utils/helpers";
import { Avatar } from "../../../../components/avatar";
import { DownloadOutlined, PhoneFilled } from "@ant-design/icons";
import { Collapse } from "../../../../components/collapse";
import WorkerTable from "./WorkerTable";
import { PrimaryButton } from "../../../../components/buttons";
import RequestProductList from "./RequestProductList";
import { useEffect } from "react";
import { Skeleton } from "../../../../components/skeletons";

export default function RequestDetails({
  request,
  loading,
}: {
  request?: Request;
  loading: boolean;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <Space direction="vertical" size={20} className="w-full">
      <Space direction="vertical" className="w-full text-sm">
        <div>
          <span className="font-bold">Mã số yêu cầu: </span>
          <span>{request?.request.requestId}</span>
        </div>
        <div>
          <span className="font-bold">Trạng thái: </span>
          <span>{requestStatusGenerator(request?.request.status)}</span>
        </div>
        <div>
          <span className="font-bold">Loại yêu cầu: </span>
          <span>{requestTypeGenerator(request?.request.categoryRequest)}</span>
        </div>
        <div>
          <span className="font-bold">Ngày bắt đầu: </span>
          <span>{formatDateToLocal(request?.request.start)}</span>
        </div>
        <div>
          <span className="font-bold">Leader: </span>
          <span>{request?.customer_Leader[1]?.fullName}</span>
        </div>
        <span className="font-bold">Khách hàng:</span>
        <Space direction="vertical" className="w-full">
          <div className="w-full rounded-lg border-2 border-solid border-secondary px-3 py-2">
            <Avatar size={150} src={request?.customer_Leader[0]?.avatarUrl} />
            <div className="font-bold">
              {request?.customer_Leader[0]?.fullName}
            </div>
            <Space size={50}>
              <div>
                <span className="font-bold">email: </span>
                <span>{request?.customer_Leader[0]?.email}</span>
              </div>
              <div>
                <Space>
                  <PhoneFilled />
                  <span className="font-bold">SĐT: </span>
                </Space>
                <span>{request?.customer_Leader[0]?.phoneNumber}</span>
              </div>
            </Space>
          </div>
        </Space>
      </Space>
      {request?.workerList.length ? (
        <Collapse
          items={[
            {
              label: "Danh sách nhân viên",
              children: <WorkerTable workers={request.workerList} />,
            },
          ]}
          fontSize={18}
        />
      ) : (
        <></>
      )}
      <div className="text-sm">
        <div className="font-bold">Mô tả vấn đề của khách hàng: </div>
        <div>{request?.request.customerProblem}</div>
      </div>
      {request?.request.conclusion && (
        <div className="text-sm">
          <div className="font-bold">Kết luận của nhân viên: </div>
          <div>{request.request.conclusion}</div>
        </div>
      )}
      {request?.request.fileUrl && (
        <PrimaryButton
          text="Tải hóa đơn"
          icon={<DownloadOutlined />}
          className="w-full"
          onClick={() => {
            if (request?.request.fileUrl) {
              window.open(request?.request.fileUrl);
            }
          }}
        />
      )}
      {request?.productList.length ? (
        <Collapse
          items={[
            {
              label: "Đơn hàng của yêu cầu",
              children: <RequestProductList products={request.productList} />,
              forceRender: true,
            },
          ]}
          fontSize={18}
        />
      ) : (
        <></>
      )}
      <Space className="flex justify-between text-sm">
        <div className="font-bold">Giá gửi yêu cầu: </div>
        <div className="font-semibold">
          {formatCurrency(request?.request.totalPrice)}
        </div>
      </Space>
      <Space className="flex justify-between text-sm">
        <div className="font-bold">Tổng giá: </div>
        <div className="font-bold">
          {formatCurrency(request?.request.totalPrice)}
        </div>
      </Space>
    </Space>
  );
}
