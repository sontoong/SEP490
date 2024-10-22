import { useCallback, useEffect, useState } from "react";
import { Product } from "../../../models/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "../../../components/skeletons";
import { List, Space } from "antd";
import { Avatar } from "../../../components/avatar";
import { products, requests } from "../../../../constants/testData";
import { combineArraysLoose, formatCurrency } from "../../../utils/helpers";
import { Request } from "../../../models/request";
import { CheckSquareOutlined } from "@ant-design/icons";

export default function RequestProductList() {
  const [data, setData] = useState<
    Request["RequestDetails"] & Partial<Product>[]
  >([]);
  // const [page, setPage] = useState(1);
  console.log(data);

  const loadMoreData = useCallback(async () => {
    // await fetch(
    //   "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo",
    // )
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData((prev) => prev.concat(body.results));
    //   })
    //   .catch(() => {});
    const sleep = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    await sleep(1000); // Example dela
    setData((prev) =>
      prev?.concat(
        combineArraysLoose(requests[0].RequestDetails, products, ["ProductId"]),
      ),
    );
    // setPage((prev) => prev++);
  }, []);

  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data?.length ?? 0}
        next={loadMoreData}
        hasMore={data?.length > 3}
        loader={
          <Skeleton avatar={{ shape: "square" }} paragraph={{ rows: 1 }} />
        }
        scrollableTarget="scrollableDiv"
      >
        <div>
          <List
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item key={item.ProductId}>
                <List.Item.Meta
                  avatar={
                    <Avatar size={50} src={item.ImageUrl} shape="square" />
                  }
                  title={
                    <div>
                      <div>{item.Name}</div>
                      <div>Số lượng: {item.Quantity}</div>
                    </div>
                  }
                  description={requests[0].Conclusion}
                />
                <Space size={20}>
                  <div>
                    {item.isCustomerPaying ? <></> : <CheckSquareOutlined />}
                  </div>
                  <div>
                    <div>{formatCurrency(item.ProductPrices?.PriceByDate)}</div>
                    <div className="font-bold">
                      {formatCurrency(
                        item.ProductPrices?.PriceByDate * item.Quantity,
                      )}
                    </div>
                  </div>
                </Space>
              </List.Item>
            )}
          />
        </div>
      </InfiniteScroll>
    </div>
  );
}
