import { WarningOutlined } from "@ant-design/icons";
import { Form } from "../../components/form";
import { Modal } from "../../components/modals";
import { useTitle } from "../../hooks/useTitle";
import { Space, TableProps, Tag } from "antd";
import { Avatar } from "../../components/avatar";
import { statusGenerator } from "../../utils/generators/status";
import ProductManagementDropdown from "../../ui/manager_ui/ProductManagementPage/ProductManagementDropdown";
import CreateNewProductModalButton from "../../ui/manager_ui/ProductManagementPage/CreateNewProductModalButton";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { products } from "../../../constants/testData";
import { Product } from "../../models/product";

export default function ProductManagementPage() {
  useTitle({
    tabTitle: "Products - EWMH",
    paths: [{ title: "Danh sách sản phẩm", path: "/products" }],
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

  const productListColumns: TableProps<Product | any>["columns"] = [
    {
      title: "Tên sản phẩm",
      dataIndex: "Name",
      render: (_, { ImageUrl, Name }) => (
        <Space direction="horizontal" size={15}>
          <Avatar src={ImageUrl} size={60} shape="square" />
          <Space direction="vertical">
            <div className="text-base font-bold">{Name}</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "Giá hiện tại",
      dataIndex: ["ProductPrices", "PriceByDate"],
    },
    {
      title: "Số lượng",
      dataIndex: "In_Of_stock",
      sorter: (a, b) => a.In_Of_stock - b.In_Of_stock,
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
      render: (_, record) => <ProductManagementDropdown record={record} />,
    },
  ];

  return (
    <>
      <Space direction="vertical" size={20} className="w-full">
        <div className="flex justify-end">
          <CreateNewProductModalButton />
        </div>
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
          columns={productListColumns} //weird lib bug
          dataSource={products}
          rowKey={(record) => record.ProductId}
        />
      </Space>
      {contextHolder}
    </>
  );
}
