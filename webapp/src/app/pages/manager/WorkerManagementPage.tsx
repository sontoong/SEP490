import { App, Space, TableColumnsType, Tag } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { Modal } from "../../components/modals";
import { WarningOutlined } from "@ant-design/icons";
import { Worker } from "../../models/user";
import { Avatar } from "../../components/avatar";
import { statusGenerator } from "../../utils/generators/status";
import WorkerManagementDropdown from "../../ui/manager_ui/WorkerManagementPage/WorkerManagementDropdown";
import { useAccount } from "../../hooks/useAccount";
import { usePagination } from "../../hooks/usePagination";
import { useCallback, useEffect, useState } from "react";

export default function WorkerManagementPage() {
  const { notification } = App.useApp();
  useTitle({
    tabTitle: "Workers - EWMH",
    paths: [{ title: "Danh sách nhân viên", path: "/workers" }],
  });
  const [modal, contextHolder] = Modal.useModal();
  const [searchForm] = Form.useForm();
  const [disableReasonForm] = Form.useForm();
  const { state, handleGetAllWorkerPaginated } = useAccount();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();
  const [searchByPhone, setSearchByPhone] = useState<string>();
  const [tableParams, setTableParams] = useState<TableParams>();

  const fetchWorkerList = useCallback(() => {
    handleGetAllWorkerPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      SearchByPhone: searchByPhone,
      IsDisabled: tableParams?.filters?.["item.isDisabled"]?.[0],
    });
  }, [
    currentPage,
    currentPageSize,
    handleGetAllWorkerPaginated,
    searchByPhone,
    tableParams?.filters,
  ]);

  useEffect(() => {
    fetchWorkerList();
  }, [fetchWorkerList]);

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = ({ searchString }: typeof initialValuesSearch) => {
    setPageSize(8);
    goToPage(1);
    setSearchByPhone(searchString);
  };

  function handleConfirmLock() {
    const initialValuesDisableReason = {
      disableReason: "",
    };

    const handleConfirmLockSubmit = (values: any) => {
      console.log(values);
    };

    modal.confirm({
      icon: <WarningOutlined />,
      width: "fit-content",
      afterClose: () => {
        disableReasonForm.resetFields();
      },
      title: (
        <div className="flex items-center whitespace-nowrap text-sm">
          <span>Bạn có muốn đổi trạng thái thành</span>
          <Tag color="volcano" className="mx-1">
            Vô hiệu hóa
          </Tag>
          <span>?</span>
        </div>
      ),
      content: (
        <Space direction="vertical" className="w-full">
          <div className="text-base text-secondary">Ghi chú</div>
          <Form
            form={disableReasonForm}
            initialValues={initialValuesDisableReason}
            name="DisableReasonForm"
            onFinish={handleConfirmLockSubmit}
          >
            <Form.Item
              noStyle
              name="disableReason"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input.TextArea placeholder="Nhập ghi chú" />
            </Form.Item>
          </Form>
        </Space>
      ),
      onOk: async () => {
        const sleep = (ms: number) => {
          return new Promise((resolve) => setTimeout(resolve, ms));
        };

        disableReasonForm.submit();
        await sleep(1000); // Example delay
      },
    });
  }

  function handleConfirmUnlock() {
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
      onOk() {},
    });
  }

  const workerListColumns: TableColumnsType<Worker> = [
    {
      title: "Họ và Tên",
      dataIndex: ["item", "fullName"],
      render: (_, { item }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={item?.avatarUrl} size={60} />
          <Space direction="vertical">
            <div className="text-base font-bold">{item?.fullName}</div>
            <div>{item?.email}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "SĐT",
      dataIndex: ["item", "phoneNumber"],
    },
    {
      title: "Leader",
      dataIndex: "leaderId",
      render: (_, { getLeaderInfo }) =>
        getLeaderInfo?.accountId ? (
          <Tag color="green">{getLeaderInfo.fullName}</Tag>
        ) : (
          <Tag color="volcano">Không</Tag>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: ["item", "isDisabled"],
      render: (isDisabled, { getLeaderInfo }) => {
        return getLeaderInfo?.accountId ? (
          <div
            className="w-fit cursor-pointer"
            onClick={() => {
              notification.info({
                message: "Nhân viên có liên kết với trưởng nhóm",
                description: (
                  <>
                    Vui lòng bỏ gán nhân viên khỏi trưởng nhóm{" "}
                    <span className="font-bold">{getLeaderInfo.fullName}</span>{" "}
                    để có thể vô hiệu hóa tài khoản.
                  </>
                ),
                placement: "topRight",
              });
            }}
          >
            {statusGenerator(isDisabled)}
          </div>
        ) : (
          <div
            onClick={() =>
              isDisabled ? handleConfirmUnlock() : handleConfirmLock()
            }
            className="cursor-pointer"
          >
            {statusGenerator(isDisabled)}
          </div>
        );
      },
      filters: [
        {
          text: "Hoạt động",
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
        <WorkerManagementDropdown
          record={record}
          callbackFn={() => fetchWorkerList()}
        />
      ),
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
                placeholder="Tìm kiếm theo email"
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
          columns={workerListColumns}
          dataSource={state.currentWorkerList.users as Worker[]}
          rowKey={(record) => record.item.accountId}
          loading={state.isFetching}
          pagination={{
            total: state.currentWorkerList.total,
            pageSize: currentPageSize,
            current: currentPage,
            onChange: (pageIndex, pageSize) => {
              goToPage(pageIndex);
              setPageSize(pageSize);
            },
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
    "item.isDisabled"?: boolean[];
  };
};
