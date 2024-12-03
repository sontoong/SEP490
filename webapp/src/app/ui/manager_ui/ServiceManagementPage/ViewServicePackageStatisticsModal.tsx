import { Space } from "antd";
import { Modal } from "../../../components/modals";
import { useEffect } from "react";
import { ServicePackage } from "../../../models/service";
import { useServicePackage } from "../../../hooks/useServicePackage";
import { useSpecialUI } from "../../../hooks/useSpecialUI";
import { Avatar } from "../../../components/avatar";
import { BookOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../utils/helpers";
import { PrimaryButton } from "../../../components/buttons";

export default function ViewServicePackageStatisticsModal({
  open = false,
  setIsModalOpen,
  servicePackage,
}: ViewServicePackageModalProps) {
  const {
    state: servicePackageState,
    handleGetRevenueAndNumberOfPurchaseOfServicePackage,
  } = useServicePackage();
  const { state: specialUIState } = useSpecialUI();

  useEffect(() => {
    if (open) {
      handleGetRevenueAndNumberOfPurchaseOfServicePackage({
        NumOfTop: 1,
        ServicePackageId: servicePackage.servicePackageId,
      });
    }
  }, [
    handleGetRevenueAndNumberOfPurchaseOfServicePackage,
    open,
    servicePackage.servicePackageId,
  ]);

  const topServicePackage = servicePackageState.topServicePackageList[0] || {};

  return (
    <Modal
      title={
        <Space className="text-base">
          <BookOutlined />
          <div className="uppercase text-secondary">Thống kê sản phẩm</div>
        </Space>
      }
      open={open}
      footer={[
        <PrimaryButton
          key="close"
          text="Đóng"
          onClick={() => setIsModalOpen(false)}
          size="middle"
        />,
      ]}
      closeIcon={null}
      maskClosable={false}
      loading={specialUIState.isLoading}
    >
      <Space direction="vertical" className="w-full text-sm">
        <div className="text-xs text-gray-400">
          #{servicePackage.servicePackageId}
        </div>
        <div className="flex gap-5">
          <div>
            <Avatar src={servicePackage.imageUrl} size={200} shape="square" />
          </div>
          <div>
            <div>
              <span className="font-bold">Tên gói: </span>
              <span>{servicePackage.name}</span>
            </div>
            <div>
              <span className="font-bold">Số lần sửa: </span>
              <span>{servicePackage.numOfRequest} lần sửa</span>
            </div>
            <div>
              <span className="font-bold">Giá gói: </span>
              {formatCurrency(servicePackage.priceByDate)}
            </div>
            <div>
              <span className="font-bold">Tổng lượt mua: </span>
              {topServicePackage.totalPurchasedQuantity || 0}
            </div>
            <div>
              <span className="font-bold">Tổng doanh thu: </span>
              {formatCurrency(topServicePackage.totalRevenue)}
            </div>
          </div>
        </div>
      </Space>
    </Modal>
  );
}

type ViewServicePackageModalProps = {
  open?: boolean;
  setIsModalOpen?: any;
  servicePackage: ServicePackage;
};
