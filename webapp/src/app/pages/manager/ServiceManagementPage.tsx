import { Space, TableColumnsType, Tag } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { Modal } from "../../components/modals";
import { Avatar } from "../../components/avatar";
import { WarningOutlined } from "@ant-design/icons";
import { statusGenerator } from "../../utils/generators/status";
import { ServicePackage } from "../../models/service";
import ServiceManagementDropdown from "../../ui/manager_ui/ServiceManagementPage/ServiceManagementDropdown";
import CreateNewServicePackageModalButton from "../../ui/manager_ui/ServiceManagementPage/CreateNewServiceModalButton";
import { formatCurrency } from "../../utils/helpers";
import { useServicePackage } from "../../hooks/useServicePackage";
import { usePagination } from "../../hooks/usePagination";
import { useCallback, useEffect, useState } from "react";
import htmlParse from "../../utils/htmlParser";

export default function ServiceManagementPage() {
  useTitle({
    tabTitle: "Service Packages - EWMH",
    paths: [{ title: "Danh sách gói dịch vụ", path: "/services" }],
  });
  const [modal, contextHolder] = Modal.useModal();
  const [searchForm] = Form.useForm();
  const {
    state,
    handleGetAllServicePackagePaginated,
    handleDisableServicePackage,
  } = useServicePackage();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();
  const [searchByName, setSearchByName] = useState<string>();
  const [tableParams, setTableParams] = useState<TableParams>();

  const fetchServicePackage = useCallback(() => {
    handleGetAllServicePackagePaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      SearchByName: searchByName,
      Status: tableParams?.filters?.status?.[0],
    });
  }, [
    currentPage,
    currentPageSize,
    handleGetAllServicePackagePaginated,
    searchByName,
    tableParams?.filters?.status,
  ]);

  useEffect(() => {
    fetchServicePackage();
  }, [fetchServicePackage]);

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = ({ searchString }: typeof initialValuesSearch) => {
    goToPage(1);
    setSearchByName(searchString);
  };

  function handleConfirmLock(servicePackageId: string) {
    modal.confirm({
      icon: <WarningOutlined />,
      width: "fit-content",
      title: (
        <div className="flex items-center whitespace-nowrap text-sm">
          <span>Bạn có muốn đổi trạng thái thành</span>
          <Tag color="volcano" className="mx-1">
            Vô hiệu hóa
          </Tag>
          <span>?</span>
        </div>
      ),
      onOk: async () => {
        await handleDisableServicePackage({
          values: { ServicePackageId: servicePackageId, Status: true },
        });
        fetchServicePackage();
      },
    });
  }

  function handleConfirmUnlock(servicePackageId: string) {
    modal.confirm({
      icon: <WarningOutlined />,
      width: "fit-content",
      title: (
        <div className="flex items-center whitespace-nowrap text-sm">
          <span>Bạn có muốn đổi trạng thái thành</span>
          <Tag color="green" className="mx-1">
            Đang hoạt động
          </Tag>
          <span>?</span>
        </div>
      ),
      onOk: async () => {
        await handleDisableServicePackage({
          values: { ServicePackageId: servicePackageId, Status: false },
        });
        fetchServicePackage();
      },
    });
  }

  const serviceListColumns: TableColumnsType<ServicePackage> = [
    {
      title: "Gói dịch vụ",
      dataIndex: "Name",
      render: (_, { imageUrl, name, numOfRequest }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={imageUrl} size={60} shape="square" />
          <Space direction="vertical">
            <div className="text-base font-bold">{name}</div>
            <div>{numOfRequest} lần sửa</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (value) => {
        return htmlParse(value);
      },
    },
    {
      title: "Giá",
      dataIndex: "priceByDate",
      render: (value) => {
        return formatCurrency(value);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, { status, servicePackageId }) => {
        return (
          <div
            onClick={() =>
              status
                ? handleConfirmUnlock(servicePackageId)
                : handleConfirmLock(servicePackageId)
            }
            className="w-fit cursor-pointer"
          >
            {statusGenerator(status)}
          </div>
        );
      },
      filters: [
        {
          text: "Đang hoạt động",
          value: false,
        },
        {
          text: "Vô hiệu hóa",
          value: true,
        },
      ],
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <ServiceManagementDropdown
          record={record}
          fetchServicePackage={fetchServicePackage}
        />
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical" size={20} className="w-full">
        <div className="flex justify-end">
          <CreateNewServicePackageModalButton />
        </div>
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
                placeholder="Tìm kiếm theo tên gói dịch vụ"
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
          columns={serviceListColumns}
          dataSource={state.currentServicePackageList.servicePackages}
          rowKey={(record) => record.servicePackageId}
          loading={state.isFetching}
          pagination={{
            showSizeChanger: true,
            total: state.currentServicePackageList.total,
            pageSize: currentPageSize,
            current: currentPage,
            onChange: (pageIndex, pageSize) => {
              goToPage(pageIndex);
              setPageSize(pageSize);
            },
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} trong tổng ${total} gói`,
            pageSizeOptions: [5, 10, 20, 50, 100],
          }}
          onChange={(_, filters) => {
            setTableParams({
              filters: filters,
            });
          }}
        />
      </Space>
      {contextHolder}
    </>
  );
}

type TableParams = {
  filters?: {
    status?: boolean[];
  };
};
