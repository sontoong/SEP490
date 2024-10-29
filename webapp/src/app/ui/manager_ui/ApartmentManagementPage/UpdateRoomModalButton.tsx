import { Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Input } from "../../../components/inputs";

export default function EditRoomModalButton() {
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
      <EditOutlined onClick={showModal} />
      <Modal
        title={
          <Space className="text-base">
            <HomeOutlined />
            <div className="uppercase text-secondary">Cập nhật số phòng</div>
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
          </div>
        </Space>
      </Modal>
    </>
  );
}
