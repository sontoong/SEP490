import { Form } from "../../components/form";
import { useTitle } from "../../hooks/useTitle";
import { Space, TableColumnsType } from "antd";
import { Input } from "../../components/inputs";
import { PendingCustomer } from "../../models/user";
import { Table } from "../../components/table";
import VerifyCustomerModalButton from "../../ui/manager_ui/VerifyCustomerPage/VerifyCustomerModalButton";
import { useAccount } from "../../hooks/useAccount";
import { usePagination } from "../../hooks/usePagination";
import { useCallback, useEffect, useState } from "react";

export default function VerifyCustomerPage() {
  useTitle({
    tabTitle: "Customer Verify - EWMH",
    paths: [{ title: "Danh sách chờ duyệt", path: "/customer-verify" }],
  });
  const [searchForm] = Form.useForm();
  const { state, handleGetAllPendingAccountPaginated } = useAccount();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();
  const [searchByPhone, setSearchByPhone] = useState<string>();

  const fetchProducts = useCallback(() => {
    handleGetAllPendingAccountPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      SearchByPhone: searchByPhone,
    });
  }, [
    currentPage,
    currentPageSize,
    handleGetAllPendingAccountPaginated,
    searchByPhone,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = ({ searchString }: typeof initialValuesSearch) => {
    setPageSize(8);
    goToPage(1);
    setSearchByPhone(searchString);
  };

  const pendingAccountListColumns: TableColumnsType<PendingCustomer> = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      render: (_, { get }) => (
        <Space direction="horizontal" size={15}>
          <Space direction="vertical">
            <div className="text-base font-bold">{get.fullName}</div>
            <div>{get.email}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "SĐT",
      dataIndex: ["get", "phoneNumber"],
    },
    {
      title: "Chung cư",
      dataIndex: ["apartment", "0", "name"],
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => <VerifyCustomerModalButton customer={record} />,
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
                onClear={() => {
                  searchForm.setFieldValue("searchString", "");
                  searchForm.submit();
                }}
              />
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={pendingAccountListColumns}
          dataSource={state.currentPendingAccountList.users}
          rowKey={(record) => record.get.pendingAccountId}
          loading={state.isFetching}
          pagination={{
            total: state.currentPendingAccountList.total,
            pageSize: currentPageSize,
            current: currentPage,
            onChange: (pageIndex, pageSize) => {
              goToPage(pageIndex);
              setPageSize(pageSize);
            },
          }}
        />
      </Space>
    </>
  );
}
