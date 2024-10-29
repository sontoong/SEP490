import { Rate, Space, TableColumnsType, Tag, Typography } from "antd";
import { Form } from "../../components/form";
import { useTitle } from "../../hooks/useTitle";
import { feedbacks } from "../../../constants/testData";
import { Table } from "../../components/table";
import { Modal } from "../../components/modals";
import { WarningOutlined } from "@ant-design/icons";
import { Avatar } from "../../components/avatar";
import { Feedback } from "../../models/feedback";
import { feedbackStatusGenerator } from "../../utils/generators/feedbackStatus";
import RatingManagementDropdown from "../../ui/manager_ui/RatingManagementPage/RatingManagementDropdown";

const { Paragraph } = Typography;

export default function RatingManagementPage() {
  useTitle({
    tabTitle: "Ratings - EWMH",
    paths: [{ title: "Danh sách đánh giá", path: "/ratings" }],
  });
  const [modal, contextHolder] = Modal.useModal();
  const [disableReasonForm] = Form.useForm();

  function handleConfirmLock() {
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
      onOk: async () => {
        const sleep = (ms: number) => {
          return new Promise((resolve) => setTimeout(resolve, ms));
        };

        handleConfirmLockSubmit("abc");
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

  const feedbackListColumns: TableColumnsType<Feedback> = [
    {
      title: "Họ và Tên",
      dataIndex: "Fullname",
      render: () => (
        <Space direction="horizontal" size={15}>
          <Avatar src="" size={60} />
          <Space direction="vertical">
            <div className="text-base font-bold">Jane Smith</div>
            <div>jane.smith@example.com</div>
          </Space>
        </Space>
      ),
    },
    {
      title: "Số sao",
      dataIndex: "Rate",
      render: (value) => <Rate allowHalf disabled value={value} />,
      sorter: (a, b) => a.Rate - b.Rate,
    },
    {
      title: "Đánh giá",
      dataIndex: "Content",
      render: (value) => (
        <Paragraph
          ellipsis={{ rows: 2 }}
          className="max-w-[900px] break-words text-sm"
        >
          {value}
        </Paragraph>
      ),
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
            {feedbackStatusGenerator(Status)}
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
      render: (_, record) => <RatingManagementDropdown feedback={record} />,
    },
  ];

  return (
    <>
      <Space direction="vertical" size={20} className="w-full">
        <Table
          columns={feedbackListColumns}
          dataSource={feedbacks}
          rowKey={(record) => record.FeedbackId}
        />
      </Space>
      {contextHolder}
    </>
  );
}
