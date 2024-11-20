import { Space, TableColumnsType, Tag } from "antd";
import { Avatar } from "../../components/avatar";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { useTitle } from "../../hooks/useTitle";
import { statusGenerator } from "../../utils/generators/status";
import { Leader } from "../../models/user";
import LeaderManagementDropdown from "../../ui/manager_ui/LeaderManagementPage/LeaderManagementDropdown";
import { Modal } from "../../components/modals";
import { WarningOutlined } from "@ant-design/icons";
import { useAccount } from "../../hooks/useAccount";
import { usePagination } from "../../hooks/usePagination";
import { useCallback, useEffect, useState } from "react";

export default function LeaderManagementPage() {
  // const { notification } = App.useApp();
  useTitle({
    tabTitle: "Leaders - EWMH",
    paths: [{ title: "Danh sách trưởng nhóm", path: "/leaders" }],
  });
  const [modal, contextHolder] = Modal.useModal();
  const [searchForm] = Form.useForm();
  const [disableReasonForm] = Form.useForm();
  const { state, handleGetAllLeaderPaginated, handleDisableUser } =
    useAccount();
  const { currentPage, currentPageSize, setPageSize, goToPage } =
    usePagination();
  const [searchByName, setSearchByName] = useState<string>();
  const [tableParams, setTableParams] = useState<TableParams>();

  const fetchLeaders = useCallback(() => {
    handleGetAllLeaderPaginated({
      PageIndex: currentPage,
      Pagesize: currentPageSize,
      SearchByEmail: searchByName,
      IsDisabled: tableParams?.filters?.isDisabled?.[0],
    });
  }, [
    currentPage,
    currentPageSize,
    handleGetAllLeaderPaginated,
    searchByName,
    tableParams?.filters?.isDisabled,
  ]);

  useEffect(() => {
    fetchLeaders();
  }, [fetchLeaders]);

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = ({ searchString }: typeof initialValuesSearch) => {
    setPageSize(8);
    goToPage(1);
    setSearchByName(searchString);
  };

  function handleConfirmLock(accountId: string) {
    const initialValuesDisableReason = {
      disableReason: "",
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
        await disableReasonForm.validateFields().then(async () => {
          const values = disableReasonForm.getFieldsValue(true);

          await handleDisableUser({
            accountId: accountId,
            disable: true,
            disabledReason: values.disabledReason,
          });
          fetchLeaders();
        });
      },
    });
  }

  function handleConfirmUnlock(accountId: string) {
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
        await handleDisableUser({
          accountId: accountId,
          disable: false,
          disabledReason: "",
        });
        fetchLeaders();
      },
    });
  }

  const leaderListColumns: TableColumnsType<Leader> = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      render: (_, { avatarUrl, fullName, email }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={avatarUrl} size={60} />
          <Space direction="vertical">
            <div className="text-base font-bold">{fullName}</div>
            <div>{email}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
    },
    {
      title: "Chung cư",
      dataIndex: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "isDisabled",
      render: (_, { isDisabled, accountId, areaId }) => {
        return areaId ? (
          <div
          // className="w-fit cursor-pointer"
          // onClick={() => {
          //   notification.info({
          //     message: "Trưởng nhóm có liên kết với chung cư",
          //     description: (
          //       <>
          //         Vui lòng thay trưởng nhóm của chung cư{" "}
          //         <span className="font-bold">{name}</span> để có thể vô
          //         hiệu hóa tài khoản.
          //       </>
          //     ),
          //     placement: "topRight",
          //   });
          // }}
          >
            {statusGenerator(isDisabled)}
          </div>
        ) : (
          <div
            className="w-fit cursor-pointer"
            onClick={() =>
              isDisabled
                ? handleConfirmUnlock(accountId)
                : handleConfirmLock(accountId)
            }
          >
            {statusGenerator(isDisabled)}
          </div>
        );
      },
      filters: [
        {
          text: "Hoạt động",
          value: "false",
        },
        {
          text: "Vô hiệu hóa",
          value: "true",
        },
      ],
      onFilter: (value, record) => record.isDisabled.toString() === value,
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => <LeaderManagementDropdown record={record} />,
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
          columns={leaderListColumns}
          dataSource={state.currentLeaderList.users as Leader[]}
          rowKey={(record) => record.accountId}
          loading={state.isFetching}
          pagination={{
            total: state.currentLeaderList.total,
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
    isDisabled?: boolean[];
  };
};
