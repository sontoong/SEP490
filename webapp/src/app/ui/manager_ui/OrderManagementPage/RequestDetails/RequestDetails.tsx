import { Space } from "antd";
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
import { useRequest } from "../../../../hooks/useRequest";
import { useEffect } from "react";

export default function RequestDetails({
  requestOrderId,
}: {
  requestOrderId: string;
}) {
  const { state: requestState, handleGetDetailsOfRequest } = useRequest();

  useEffect(() => {
    handleGetDetailsOfRequest({ RequestId: requestOrderId });
  }, [handleGetDetailsOfRequest, requestOrderId]);

  return (
    <Space direction="vertical" size={20} className="w-full">
      <Space direction="vertical" className="w-full text-sm">
        <div>
          <span className="font-bold">Mã số yêu cầu: </span>
          <span>{requestState.currentRequest.request.requestId}</span>
        </div>
        <div>
          <span className="font-bold">Trạng thái: </span>
          <span>
            {requestStatusGenerator(requestState.currentRequest.request.status)}
          </span>
        </div>
        <div>
          <span className="font-bold">Loại yêu cầu: </span>
          <span>
            {requestTypeGenerator(
              requestState.currentRequest.request.categoryRequest,
            )}
          </span>
        </div>
        <div>
          <span className="font-bold">Ngày bắt đầu: </span>
          <span>
            {formatDateToLocal(requestState.currentRequest.request.start)}
          </span>
        </div>
        <div>
          <span className="font-bold">Leader: </span>
          <span>{requestState.currentRequest.customer_Leader[1].fullName}</span>
        </div>
        <span className="font-bold">Khách hàng:</span>
        <Space direction="vertical" className="w-full">
          <div className="w-full rounded-lg border-2 border-solid border-secondary px-3 py-2">
            <Avatar
              size={150}
              src={requestState.currentRequest.customer_Leader[0].avatarUrl}
            />
            <div className="font-bold">
              {requestState.currentRequest.customer_Leader[0].fullName}
            </div>
            <Space size={50}>
              <div>
                <span className="font-bold">email: </span>
                <span>
                  {requestState.currentRequest.customer_Leader[0].email}
                </span>
              </div>
              <div>
                <Space>
                  <PhoneFilled />
                  <span className="font-bold">SĐT: </span>
                </Space>
                <span>
                  {requestState.currentRequest.customer_Leader[0].phoneNumber}
                </span>
              </div>
            </Space>
          </div>
        </Space>
      </Space>
      {requestState.currentRequest.workerList.length ? (
        <Collapse
          items={[
            {
              label: "Danh sách nhân viên",
              children: (
                <WorkerTable workers={requestState.currentRequest.workerList} />
              ),
            },
          ]}
          fontSize={18}
        />
      ) : (
        <></>
      )}
      <div className="text-sm">
        <div className="font-bold">Mô tả vấn đề của khách hàng: </div>
        <div>{requestState.currentRequest.request.customerProblem}</div>
      </div>
      {requestState.currentRequest.request.conclusion && (
        <div className="text-sm">
          <div className="font-bold">Kết luận của nhân viên: </div>
          <div>{requestState.currentRequest.request.conclusion}</div>
        </div>
      )}
      {requestState.currentRequest.request.fileUrl && (
        <PrimaryButton
          text="Tải hóa đơn"
          icon={<DownloadOutlined />}
          className="w-full"
        />
      )}
      {requestState.currentRequest.productList.length ? (
        <Collapse
          items={[
            {
              label: "Đơn hàng của yêu cầu",
              children: (
                <RequestProductList
                  products={requestState.currentRequest.productList}
                />
              ),
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
          {formatCurrency(requestState.currentRequest.request.totalPrice)}
        </div>
      </Space>
      <Space className="flex justify-between text-sm">
        <div className="font-bold">Tổng giá: </div>
        <div className="font-bold">
          {formatCurrency(requestState.currentRequest.request.totalPrice)}
        </div>
      </Space>
    </Space>
  );
}
