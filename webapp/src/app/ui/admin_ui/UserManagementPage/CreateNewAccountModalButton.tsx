import { Input, Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { InputDate } from "../../../components/inputs";
import { PrimaryButton } from "../../../components/buttons";
import {
  EditOutlined,
  PlusCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Radio from "../../../components/radio/Radio";
// import { Avatar } from "../../components/avatar";
import { roleNameGenerator } from "../../../utils/generators/roleName";
import { formatDateToLocal } from "../../../utils/helpers";
import { User } from "../../../models/user";

export default function CreateNewAccountModalButton() {
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialValues: any = {
    Fullname: "",
    Email: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Role: "3",
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreateAccountModalOk = async () => {
    form.submit();
  };

  const handleCreateAccountModalCancel = () => {
    setIsModalVisible(false);
  };

  const onFormFinish = (values: any) => {
    handlePreviewDetail(values);
  };

  const handlePreviewDetail = (values: User) => {
    modal.confirm({
      icon: <WarningOutlined />,
      width: "fit-content",
      title: <div className="text-sm">Bạn có muốn tạo tài khoản</div>,
      content: (
        <Space direction="vertical">
          {/* <Avatar src={values.AvatarUrl} size={70} /> */}
          <div className="text-lg font-bold">{values.Fullname}</div>
          <Space direction="horizontal" size={30} className="flex w-full">
            <Space direction="vertical" size={5}>
              <div>
                <strong>Email:</strong> {values.Email}
              </div>
              <div>
                <strong>SĐT:</strong> {values.PhoneNumber}
              </div>
            </Space>
            <Space direction="vertical" size={5}>
              <div>
                <strong>Vai trò:</strong> {roleNameGenerator(values.Role)}
              </div>
              <div>
                <strong>Ngày sinh:</strong>{" "}
                {formatDateToLocal(values.DateOfBirth)}
              </div>
            </Space>
          </Space>
        </Space>
      ),
      onCancel: () => {
        setIsModalVisible(false);
      },
      onOk: async () => {
        const sleep = (ms: number) => {
          return new Promise((resolve) => setTimeout(resolve, ms));
        };

        await sleep(1000); // Example delay
      },
    });
  };

  return (
    <>
      <PrimaryButton
        text="Tạo Tài Khoản Mới"
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      />
      <Modal
        title={
          <Space>
            <EditOutlined className="text-sm" />
            <div className="text-sm uppercase text-secondary">
              Tạo tài khoản mới
            </div>
          </Space>
        }
        maskClosable={false}
        open={isModalVisible}
        afterClose={form.resetFields}
        onOk={handleCreateAccountModalOk}
        onCancel={handleCreateAccountModalCancel}
        closeIcon={null}
        // confirmLoading={state.isSending}
        modalRender={(dom) => (
          <Form
            form={form}
            initialValues={initialValues}
            name="CreateAccountForm"
            onFinish={onFormFinish}
            clearOnDestroy
          >
            {dom}
          </Form>
        )}
      >
        <div className="w-[100%]">
          <Form.Item
            name="Fullname"
            label="Họ và Tên"
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Nhập họ và tên" size="large" />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input placeholder="Nhập Email" size="large" />
          </Form.Item>
          <Space className="flex w-full justify-between">
            <Form.Item
              name="PhoneNumber"
              label="SĐT"
              rules={[
                { required: true, whitespace: true },
                {
                  type: "string",
                  pattern: /^[0-9]+$/,
                  len: 11,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}
            >
              <Input placeholder="Nhập SĐT" size="large" />
            </Form.Item>
            <Form.Item
              name="DateOfBirth"
              label="Ngày sinh"
              rules={[{ required: true }]}
            >
              <InputDate placeholder="Chọn ngày sinh" size="large" />
            </Form.Item>
          </Space>
          <Form.Item name="Role" label="Vai trò" rules={[{ required: true }]}>
            <Radio.ButtonGroup
              items={[
                {
                  icon: <SolutionOutlined />,
                  enName: "Team Leader",
                  vnName: "Trưởng nhóm",
                  value: "3",
                },
                {
                  icon: <TeamOutlined />,
                  enName: "Worker",
                  vnName: "Công nhân",
                  value: "4",
                },
              ]}
              render={(item) => (
                <div className="rounded-lg border-2 border-solid border-secondary bg-white px-10 py-5 text-secondary">
                  <Space direction="vertical" size={2} className="w-full">
                    <div className="text-lg">{item?.icon}</div>
                    <div className="text-base">{item?.enName}</div>
                    <div>{item?.vnName}</div>
                  </Space>
                </div>
              )}
              activeRender={(item) => (
                <div className="rounded-lg bg-secondary px-10 py-5 text-white">
                  <Space direction="vertical" size={2} className="w-full">
                    <div className="text-lg">{item?.icon}</div>
                    <div className="text-base">{item?.enName}</div>
                    <div>{item?.vnName}</div>
                  </Space>
                </div>
              )}
            />
          </Form.Item>
        </div>
      </Modal>
      {contextHolder}
    </>
  );
}
