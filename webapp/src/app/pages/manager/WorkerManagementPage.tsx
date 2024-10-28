import { Space, TableColumnsType, Tag } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { Modal } from "../../components/modals";
import { WarningOutlined } from "@ant-design/icons";
import { Worker } from "../../models/user";
import { Avatar } from "../../components/avatar";
import { statusGenerator } from "../../utils/generators/status";
import { workers } from "../../../constants/testData";
import WorkerManagementDropdown from "../../ui/manager_ui/WorkerManagementPage/WorkerManagementDropdown";

export default function WorkerManagementPage() {
  useTitle({
    tabTitle: "Workers - EWMH",
    paths: [{ title: "Danh sách nhân viên", path: "/workers" }],
  });
  const [modal, contextHolder] = Modal.useModal();
  const [searchForm] = Form.useForm();
  const [disableReasonForm] = Form.useForm();

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = (values: any) => {
    console.log(values);
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
      dataIndex: "Fullname",
      render: (_, { AvatarUrl, Fullname, Email }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={AvatarUrl} size={60} />
          <Space direction="vertical">
            <div className="text-base font-bold">{Fullname}</div>
            <div>{Email}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "SĐT",
      dataIndex: "PhoneNumber",
    },
    {
      title: "Leader",
      dataIndex: "LeaderId",
      render: (value) =>
        value ? (
          <Tag color="green">{value}</Tag>
        ) : (
          <Tag color="volcano">Không</Tag>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "IsDisabled",
      render: (_, { IsDisabled, LeaderId }) => {
        return LeaderId ? (
          <div>{statusGenerator(IsDisabled)}</div>
        ) : (
          <div
            onClick={() =>
              IsDisabled ? handleConfirmUnlock() : handleConfirmLock()
            }
            className="cursor-pointer"
          >
            {statusGenerator(IsDisabled)}
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
      onFilter: (value, record) => record.IsDisabled.toString() === value,
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => <WorkerManagementDropdown record={record} />,
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
          >
            <Form.Item
              noStyle
              name="searchString"
              rules={[
                {
                  type: "string",
                  required: true,
                  whitespace: true,
                  message: "",
                },
              ]}
            >
              <Input.Search
                placeholder="Tìm kiếm"
                onSearch={() => searchForm.submit()}
              />
            </Form.Item>
          </Form>
        </div>
        <Table
          columns={workerListColumns} //weird lib bug
          dataSource={workers}
          rowKey={(record) => record.AccountId}
        />
      </Space>
      {contextHolder}
    </>
  );
}
