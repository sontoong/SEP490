import { Input, Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { InputNumber } from "../../../components/inputs";
import { PrimaryButton } from "../../../components/buttons";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TextEditor } from "../../../components/rte";
import { ImageUpload } from "../../../components/image-upload";
import { UploadImage } from "../../../components/image-upload/image-upload";

export default function CreateNewServicePackageModalButton() {
  const [createNewServicePackageForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState<UploadImage[]>([]);

  const initialValuesCreateNewService: any = {
    Name: "",
    Description: "",
    NumOfRequest: 0,
    Policy: "",
    ServicePackagePrices: {
      PriceByDate: 0,
    },
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    createNewServicePackageForm.submit();
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
        text="Tạo gói dịch vụ mới"
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      />
      <Modal
        title={
          <Space className="text-base">
            <EditOutlined />
            <div className="uppercase text-secondary">Cập nhật gói dịch vụ</div>
          </Space>
        }
        open={isModalVisible}
        afterClose={createNewServicePackageForm.resetFields}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        maskClosable={false}
        modalRender={(dom) => (
          <Form
            form={createNewServicePackageForm}
            initialValues={initialValuesCreateNewService}
            name="CreateNewServiceForm"
            onFinish={handleCreateNewServiceSubmit}
          >
            {dom}
          </Form>
        )}
      >
        <Space direction="vertical" className="w-full">
          <ImageUpload images={images} setImages={setImages} />
          <Form.Item
            name="Name"
            label={
              <div className="text-sm text-secondary">Tên gói dịch vụ</div>
            }
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Nhập tên gói dịch vụ" />
          </Form.Item>
          <Form.Item
            name="Description"
            label={<div className="text-sm text-secondary">Mô tả</div>}
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
            ]}
          >
            <TextEditor />
          </Form.Item>
          <Form.Item
            name="NumOfRequest"
            label={
              <div className="text-sm text-secondary">Số lần sửa chữa</div>
            }
            rules={[
              {
                type: "number",
                min: 1,
                required: true,
                message: "Số lần sửa chữa không hợp lệ",
                whitespace: true,
              },
            ]}
          >
            <InputNumber placeholder="Nhập số lần sửa chữa" className="w-1/2" />
          </Form.Item>
          <Form.Item
            name={["ServicePackagePrices", "PriceByDate"]}
            label={<div className="text-sm text-secondary">Giá gói (VND)</div>}
            rules={[{ type: "number", required: true, min: 1000 }]}
          >
            <InputNumber.Currency
              placeholder="Nhập giá của gói"
              className="w-1/2"
              step={1000}
            />
          </Form.Item>
          <Form.Item
            name="Policy"
            label={<div className="text-sm text-secondary">Chính sách</div>}
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
            ]}
          >
            <TextEditor />
          </Form.Item>
        </Space>
      </Modal>
    </>
  );
}
