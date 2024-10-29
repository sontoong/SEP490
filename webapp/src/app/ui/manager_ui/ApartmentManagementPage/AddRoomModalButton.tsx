import { Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { PrimaryButton } from "../../../components/buttons";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Input } from "../../../components/inputs";

export default function AddRoomModalButton() {
  const [addRoomForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialValuesCreateNewApartment: any = {
    RoomId: "",
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    addRoomForm.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateNewServiceSubmit = (values: any) => {
    console.log(values);
    setIsModalVisible(false);
  };

  return (
    <>
      <PrimaryButton
        text="Thêm phòng mới"
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      />
      <Modal
        title={
          <Space className="text-base">
            <HomeOutlined />
            <div className="uppercase text-secondary">Thêm phòng mới</div>
          </Space>
        }
        open={isModalVisible}
        afterClose={addRoomForm.resetFields}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        maskClosable={false}
        modalRender={(dom) => (
          <Form
            form={addRoomForm}
            initialValues={initialValuesCreateNewApartment}
            name="AddRoomForm"
            onFinish={handleCreateNewServiceSubmit}
          >
            {dom}
          </Form>
        )}
      >
        <Space direction="vertical" className="w-full">
          <div>
            <Form.Item
              name="RoomId"
              label={<div className="text-sm text-secondary">Số phòng</div>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Nhập số phòng" />
            </Form.Item>
            <PrimaryButton
              text="Thêm phòng"
              className="w-full"
              icon={<PlusCircleOutlined />}
              bgColor="#4cc9c7"
            />
          </div>
        </Space>
      </Modal>
    </>
  );
}
