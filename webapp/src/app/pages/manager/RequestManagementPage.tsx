import { Space, Tabs, TabsProps } from "antd";
import { Form } from "../../components/form";
import { useTitle } from "../../hooks/useTitle";
import { Input } from "../../components/inputs";
import NewRequestTab from "../../ui/manager_ui/RequestManagementPage/NewRequestTab";
import { requests } from "../../../constants/testData";

export default function RequestManagementPage() {
  useTitle({
    tabTitle: "Requests - EWMH",
    paths: [{ title: "Danh sách yêu cầu", path: "/requests" }],
  });
  const [searchForm] = Form.useForm();

  const initialValuesSearch = {
    searchString: "",
  };

  const handleSearchSubmit = (values: any) => {
    console.log(values);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Yêu cầu mới",
      children: (
        <NewRequestTab
          requests={requests.filter((value) => value.Status === 1)}
        />
      ),
    },
    {
      key: "2",
      label: "Đã được duyệt",
      children: (
        <NewRequestTab
          requests={requests.filter((value) => value.Status === 2)}
        />
      ),
    },
    {
      key: "3",
      label: "Đã hoàn thành",
      children: (
        <NewRequestTab
          requests={requests.filter((value) => value.Status === 3)}
        />
      ),
    },
    {
      key: "4",
      label: "Đã hủy",
      children: (
        <NewRequestTab
          requests={requests.filter((value) => value.Status === 4)}
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
        <Tabs defaultActiveKey="1" items={items} />
      </Space>
    </>
  );
}
