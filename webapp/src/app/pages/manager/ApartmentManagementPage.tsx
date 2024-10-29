import { EnvironmentFilled, WarningOutlined } from "@ant-design/icons";
import { Form } from "../../components/form";
import { Modal } from "../../components/modals";
import { useTitle } from "../../hooks/useTitle";
import { Space, TableColumnsType, Tag, Typography } from "antd";
import { Avatar } from "../../components/avatar";
import { Table } from "../../components/table";
import { apartmentAreas } from "../../../constants/testData";
import { ApartmentArea } from "../../models/apartmentArea";
import { leaderNameGenerator } from "../../utils/generators/name";
import { statusGenerator } from "../../utils/generators/status";
import ApartmentManagementDropdown from "../../ui/manager_ui/ApartmentManagementPage/ApartmentManagementDropdown";
import { Input } from "../../components/inputs";
import CreateNewApartmentModalButton from "../../ui/manager_ui/ApartmentManagementPage/CreateNewApartmentModalButton";

const { Paragraph } = Typography;

export default function ApartmentManagementPage() {
  useTitle({
    tabTitle: "Apartments - EWMH",
    paths: [{ title: "Danh sách chung cư", path: "/apartments" }],
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

  const apartmentListColumns: TableColumnsType<ApartmentArea> = [
    {
      title: "Tên chung cư",
      render: (_, { Name, AvatarUrl, Address }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={AvatarUrl} size={60} shape="square" />
          <Space direction="vertical">
            <div className="text-base font-bold">{Name}</div>
            <Space>
              <EnvironmentFilled />
              <Paragraph ellipsis={{ rows: 1 }} className="!m-0 text-sm">
                {Address}
              </Paragraph>
            </Space>
          </Space>
        </Space>
      ),
    },
    {
      title: "Công ty",
      dataIndex: "ManagementCompany",
    },
    {
      title: "Miêu tả",
      dataIndex: "Description",
      render: (value) => (
        <Paragraph
          ellipsis={{ rows: 2 }}
          className="max-w-[500px] break-words text-sm"
        >
          {value}
        </Paragraph>
      ),
    },
    {
      title: "Trưởng nhóm",
      render: (_, { LeaderId }) => {
        return <div>{leaderNameGenerator(LeaderId)}</div>;
      },
    },
    {
      title: "Trạng thái",
      render: (_, { Status }) => {
        return (
          <div
            onClick={() =>
              Status ? handleConfirmLock() : handleConfirmUnlock()
            }
            className="cursor-pointer"
          >
            {statusGenerator(!Status)}
          </div>
        );
      },
      filters: [
        {
          text: "Hoạt động",
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
      render: (_, record) => <ApartmentManagementDropdown apartment={record} />,
    },
  ];

  return (
    <>
      <Space direction="vertical" size={20} className="w-full">
        <div className="flex justify-end">
          <CreateNewApartmentModalButton />
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
          columns={apartmentListColumns}
          dataSource={apartmentAreas}
          rowKey={(record) => record.AreaId}
        />
      </Space>
      {contextHolder}
    </>
  );
}
