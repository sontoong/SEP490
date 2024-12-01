import { Table } from "../../../../components/table";
import { Space, TableColumnsType } from "antd";
import { formatCurrency } from "../../../../utils/helpers";
import { useCallback, useEffect } from "react";
import { Avatar } from "../../../../components/avatar";
import { useProduct } from "../../../../hooks/useProduct";
import { TopProduct } from "../../../../models/product";

export default function TopProductsTable() {
  const { state: productState, handleGetRevenueAndNumberOfPurchaseOfProduct } =
    useProduct();

  const fetchTopProducts = useCallback(() => {
    handleGetRevenueAndNumberOfPurchaseOfProduct({
      NumOfTop: 3,
      ProductId: "",
    });
  }, [handleGetRevenueAndNumberOfPurchaseOfProduct]);

  useEffect(() => {
    fetchTopProducts();
  }, [fetchTopProducts]);

  const topProductListColumns: TableColumnsType<TopProduct> = [
    {
      title: "Xếp hạng",
      dataIndex: "Id",
      render: (_, __, index) => <>{index + 1}</>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (_, { productName, productImageUrl }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={productImageUrl} size={60} shape="square" />
          <Space direction="vertical">
            <div className="text-base font-bold">{productName}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "Giá",
      dataIndex: "latestPrice",
      render: (_, { latestPrice }) => {
        return formatCurrency(latestPrice);
      },
    },
    {
      title: "Tổng số lượt mua",
      dataIndex: "totalPurchasedQuantity",
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      render: (_, { totalRevenue }) => {
        return formatCurrency(totalRevenue);
      },
    },
  ];
  return (
    <>
      <Table
        columns={topProductListColumns}
        dataSource={productState.topProductList}
        rowKey={(record) => record.productId}
        loading={productState.isFetching}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
}
