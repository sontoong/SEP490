import { Form } from "../../components/form";
import { useTitle } from "../../hooks/useTitle";
import { Space, TableColumnsType } from "antd";
import { Contract } from "../../models/contract";
import { contractStatusGenerator } from "../../utils/generators/contractStatus";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { formatDateToLocal } from "../../utils/helpers";
import ContractManagementDropdown from "../../ui/manager_ui/ContractManagementPage/ContractManagementDropdown";
import { useCallback, useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useContract } from "../../hooks/useContract";

export default function ContractManagementPage() {
  useTitle({
    tabTitle: "Contracts - EWMH",
    paths: [{ title: "Danh sách hợp đồng", path: "/contracts" }],
  });
  const [searchForm] = Form.useForm();
  const { state, handleGetAllContractPaginated } = useContract();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();
  const [searchByPhone, setSearchByPhone] = useState<string>();
  const [tableParams, setTableParams] = useState<TableParams>();

  const fetchContracts = useCallback(() => {
    handleGetAllContractPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      SearchByPhone: searchByPhone,
      PurchaseTime_Des_Sort:
        tableParams?.sorter?.["item.PurchaseTime_Des_Sort"],
    });
  }, [
    currentPage,
    currentPageSize,
    handleGetAllContractPaginated,
    searchByPhone,
    tableParams?.sorter,
  ]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = ({ searchString }: typeof initialValuesSearch) => {
    goToPage(1);
    setSearchByPhone(searchString);
  };

  const contractListColumns: TableColumnsType<Contract> = [
    {
      title: "Mã hợp đồng",
      dataIndex: ["item", "contractId"],
    },
    {
      title: "Tên gói dịch vụ",
      dataIndex: ["item", "name"],
      // render: (_, { item }) => (
      //   <Space direction="vertical">
      //     <div className="text-base font-bold">{item.name}</div>
      //   </Space>
      // ),
    },
    {
      title: "Khách hàng",
      dataIndex: ["getCusInfo", "fullName"],
    },
    {
      title: "Thanh toán vào",
      dataIndex: ["item", "purchaseTime"],
      render: (value) => <div>{formatDateToLocal(value)}</div>,
      sorter: true,
      sortDirections: ["descend"],
    },
    {
      title: "Tổng lần sửa",
      dataIndex: ["item", "numOfRequest"],
    },
    {
      title: "Lần sửa còn",
      dataIndex: ["item", "remainingNumOfRequests"],
    },
    {
      title: "Hạn sử dụng",
      dataIndex: ["item", "expireDate"],
      render: (value) => <div>{formatDateToLocal(value)}</div>,
    },
    {
      title: "Trạng thái",
      render: (_, { item }) => {
        return (
          <div>
            {contractStatusGenerator({
              remaining: item.remainingNumOfRequests,
            })}
          </div>
        );
      },
    },
    {
      title: "",
      key: "actions",
      render: (record) => <ContractManagementDropdown record={record} />,
    },
  ];

  return (
    <>
      <Space direction="vertical" size={20} className="w-full">
        <div className="flex items-center justify-end">
          <Form
            form={searchForm}
            initialValues={initialValuesSearch}
            name="SearchForm"
            onFinish={handleSearchSubmit}
            className="w-1/2"
          >
            <Form.Item
              noStyle
              name="searchString"
              rules={[
                {
                  type: "string",
                  whitespace: true,
                  message: "",
                },
              ]}
            >
              <Input.Search
                placeholder="Tìm kiếm theo SĐT"
                onSearch={() => searchForm.submit()}
              />
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={contractListColumns}
          dataSource={state.currentContractList.contracts}
          rowKey={(record) => record.item.contractId}
          loading={state.isFetching}
          pagination={{
            showSizeChanger: true,
            total: state.currentContractList.total,
            pageSize: currentPageSize,
            current: currentPage,
            onChange: (pageIndex, pageSize) => {
              goToPage(pageIndex);
              setPageSize(pageSize);
            },
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} trong tổng ${total} hợp đồng`,
          }}
          onChange={(_, __, sorter) => {
            setTableParams({
              sorter: {
                "item.PurchaseTime_Des_Sort": Array.isArray(sorter)
                  ? undefined
                  : !(sorter.order === "descend"),
              },
            });
          }}
        />
      </Space>
    </>
  );
}

type TableParams = {
  sorter?: {
    "item.PurchaseTime_Des_Sort"?: boolean | undefined;
  };
};
