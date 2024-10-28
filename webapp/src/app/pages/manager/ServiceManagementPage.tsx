import { Space, TableColumnsType, Tag } from "antd";
import { useTitle } from "../../hooks/useTitle";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { Modal } from "../../components/modals";
import { Avatar } from "../../components/avatar";
import { WarningOutlined } from "@ant-design/icons";
import { statusGenerator } from "../../utils/generators/status";
import { servicePackages } from "../../../constants/testData";
import { ServicePackage } from "../../models/service";
import ServiceManagementDropdown from "../../ui/manager_ui/ServiceManagementPage/ServiceManagementDropdown";
import CreateNewServicePackageModalButton from "../../ui/manager_ui/ServiceManagementPage/CreateNewServiceModalButton";
import { formatCurrency } from "../../utils/helpers";

export default function ServiceManagementPage() {
  useTitle({
    tabTitle: "Service Packages - EWMH",
    paths: [{ title: "Danh sách gói dịch vụ", path: "/services" }],
  });
  const [modal, contextHolder] = Modal.useModal();
  const [searchForm] = Form.useForm();

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = (values: any) => {
    console.log(values);
  };

  function handleConfirmLock() {
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
        const sleep = (ms: number) => {
          return new Promise((resolve) => setTimeout(resolve, ms));
        };

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

  const serviceListColumns: TableColumnsType<ServicePackage> = [
    {
      title: "Gói dịch vụ",
      dataIndex: "Name",
      render: (_, { ImageUrl, Name, NumOfRequest }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={ImageUrl} size={60} shape="square" />
          <Space direction="vertical">
            <div className="text-base font-bold">{Name}</div>
            <div>{NumOfRequest} lần sửa</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
    },
    {
      title: "Giá",
      dataIndex: ["ServicePackagePrices", "PriceByDate"],
      render: (value) => {
        return formatCurrency(value);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (_, { Status }) => {
        const isDisabled = !Status;
        return (
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
          text: "Đang hoạt động",
          value: "true",
        },
        {
          text: "Vô hiệu hóa",
          value: "false",
        },
      ],
      onFilter: (value, record) => record.Status.toString() === value,
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => <ServiceManagementDropdown record={record} />,
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
          columns={serviceListColumns}
          dataSource={servicePackages}
          rowKey={(record) => record.ServicePackageId}
        />
      </Space>
      {contextHolder}
    </>
  );
}
