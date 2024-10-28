import { Form } from "../../components/form";
import { useTitle } from "../../hooks/useTitle";
import { Space, TableColumnsType } from "antd";
import { Contract } from "../../models/contract";
import { contractStatusGenerator } from "../../utils/generators/contractStatus";
import { Input } from "../../components/inputs";
import { Table } from "../../components/table";
import { calculateDateToNow, formatDateToLocal } from "../../utils/helpers";
import { contracts, customers } from "../../../constants/testData";
import ContractManagementDropdown from "../../ui/manager_ui/ContractManagementPage/ContractManagementDropdown";

export default function ContractManagementPage() {
  useTitle({
    tabTitle: "Contracts - EWMH",
    paths: [{ title: "Danh sách hợp đồng", path: "/contracts" }],
  });
  const [searchForm] = Form.useForm();

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = (values: any) => {
    console.log(values);
  };

  const contractListColumns: TableColumnsType<Contract> = [
    {
      title: "Hợp đồng",
      render: (_, { ContractId, ServicePackageId }) => (
        <Space direction="vertical">
          <div className="text-base font-bold">{ServicePackageId}</div>
          <div className="text-base">{ContractId}</div>
        </Space>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "CustomerId",
    },
    {
      title: "Thanh toán vào",
      dataIndex: "PurchaseTime",
      render: (value) => <div>{formatDateToLocal(value)}</div>,
      sorter: (a, b) =>
        (calculateDateToNow({
          time: a.PurchaseTime,
          format: false,
        }) as number) -
        (calculateDateToNow({
          time: b.PurchaseTime,
          format: false,
        }) as number),
    },
    {
      title: "Lần sửa còn",
      dataIndex: "RemainingNumOfRequests",
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (_, { RemainingNumOfRequests }) => {
        return <div>{contractStatusGenerator(RemainingNumOfRequests)}</div>;
      },
      filters: [
        {
          text: "Đang hoạt động",
          value: "active",
        },
        {
          text: "Vô hiệu hóa",
          value: "inactive",
        },
      ],
      onFilter: (value, record) => {
        if (value === "inactive") {
          return record.RemainingNumOfRequests === 0;
        }
        if (value === "active") {
          return record.RemainingNumOfRequests !== 0;
        }
        return false;
      },
    },
    {
      title: "",
      key: "actions",
      render: () => <ContractManagementDropdown record={customers[0]} />,
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
          columns={contractListColumns} //weird lib bug
          dataSource={contracts}
          rowKey={(record) => record.ContractId}
        />
      </Space>
    </>
  );
}
