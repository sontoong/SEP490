import { useCallback, useEffect, useState } from "react";
import { Product } from "../../../models/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "../../../components/skeletons";
import { Space } from "antd";
import { Avatar } from "../../../components/avatar";
import { products, requests } from "../../../../constants/testData";
import { combineArraysLoose, formatCurrency } from "../../../utils/helpers";
import { Request } from "../../../models/request";
import { ArrayElement } from "../../../utils/types";
import { List } from "../../../components/list";
import { CheckCircleTwoTone } from "@ant-design/icons";

export default function RequestProductList() {
  const [data, setData] = useState<RequestProduct[]>([]);
  // const [page, setPage] = useState(1);

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
        combineArraysLoose(requests[1].RequestDetails, products, ["ProductId"]),
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
            fontSize={18}
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.ProductId}
                extra={
                  <Space size={20}>
                    <div>
                      <div>
                        <span>Giá gốc: </span>
                        {formatCurrency(item.ProductPrices?.PriceByDate)}
                      </div>
                      <div className="font-bold">
                        <span>Tổng: </span>
                        {item.ProductPrices?.PriceByDate
                          ? formatCurrency(
                              item.ProductPrices?.PriceByDate * item.Quantity,
                            )
                          : "N/A"}
                      </div>
                    </div>
                  </Space>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar size={50} src={item.ImageUrl} shape="square" />
                  }
                  title={
                    <div>
                      <Space>
                        <div>{item.Name}</div>
                        <div>
                          {item.isCustomerPaying ? (
                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                          ) : (
                            <></>
                          )}
                        </div>
                      </Space>
                      <div>Số lượng: {item.Quantity}</div>
                    </div>
                  }
                />
                <div>
                  <span className="font-semibold">Lý do: </span>
                  {requests[0].Conclusion}
                </div>
              </List.Item>
            )}
          />
        </div>
      </InfiniteScroll>
    </div>
  );
}

type RequestProduct = ArrayElement<Request["RequestDetails"]> &
  Partial<Product>;
