import { Space } from "antd";
import { Modal } from "../../../components/modals";
import { useEffect } from "react";
import { Product } from "../../../models/product";
import { useProduct } from "../../../hooks/useProduct";
import { useSpecialUI } from "../../../hooks/useSpecialUI";
import { Avatar } from "../../../components/avatar";
import { ToolOutlined } from "@ant-design/icons";
import { formatCurrency } from "../../../utils/helpers";
import { PrimaryButton } from "../../../components/buttons";

export default function ViewProductStatisticsModal({
  open = false,
  setIsModalOpen,
  product,
}: ViewProductModalProps) {
  const { state: productState, handleGetRevenueAndNumberOfPurchaseOfProduct } =
    useProduct();
  const { state: specialUIState } = useSpecialUI();

  useEffect(() => {
    if (open) {
      handleGetRevenueAndNumberOfPurchaseOfProduct({
        ProductId: product.productId,
        NumOfTop: 1,
      });
    }
  }, [handleGetRevenueAndNumberOfPurchaseOfProduct, product.productId, open]);

  const topProduct = productState.topProductList[0] || {};

  return (
    <Modal
      title={
        <Space className="text-base">
          <ToolOutlined />
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
        <Space direction="vertical" size={5} className="w-full">
          <div className="flex gap-5">
            <div>
              <Avatar src={product.imageUrl} size={200} shape="square" />
            </div>
            <div>
              <div>
                <span className="font-bold">Tên sản phẩm: </span>
                {product.name}
              </div>
              <div>
                <span className="font-bold">Giá hiện tại: </span>
                {formatCurrency(product.priceByDate)}
              </div>
              <div>
                <span className="font-bold">Số lượng trong kho: </span>
                {product.inOfStock}
              </div>
            </div>
          </div>
          <Space size={25} className="flex w-full justify-between">
            <div>
              <span className="font-bold">Số lượng đã bán: </span>
              {topProduct.totalPurchasedQuantity || 0}
            </div>
            <div>
              <span className="font-bold">Tổng doanh thu: </span>
              {formatCurrency(topProduct.totalRevenue)}
            </div>
          </Space>
        </Space>
      </Space>
    </Modal>
  );
}

type ViewProductModalProps = {
  open?: boolean;
  setIsModalOpen?: any;
  product: Product;
};
