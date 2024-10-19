import { Space } from "antd";
import { Modal } from "../../../components/modals";
import { Form } from "../../../components/form";
import { Input, InputNumber } from "../../../components/inputs";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ServicePackage } from "../../../models/service";
import { UploadImage } from "../../../components/image-upload/image-upload";
import { ensureBase64Avatar } from "../../../utils/helpers";
import { ImageUpload } from "../../../components/image-upload";
import { TextEditor } from "../../../components/rte";

export default function UpdateServiceModal({
  open = false,
  setIsModalOpen,
  record,
}: UpdateServiceModalProps) {
  const [updateServiceForm] = Form.useForm();
  const [images, setImages] = useState<UploadImage[]>([]);

  const initialValuesUpdateService = {
    Name: "",
    Description: "",
    NumOfRequest: 0,
    Policy: "",
    ServicePackagePrices: {
      PriceByDate: 0,
    },
  };

  useEffect(() => {
    updateServiceForm.setFieldsValue({
      Name: record.Name,
      Description: record.Description,
      NumOfRequest: record.NumOfRequest,
      Policy: record.Policy,
      ServicePackagePrices: {
        PriceByDate: record.ServicePackagePrices.PriceByDate,
      },
    });
    if (record.ImageUrl) {
      setImages([
        {
          name: "",
          url: ensureBase64Avatar(record.ImageUrl),
        },
      ]);
    }
  }, [record, record.ImageUrl, updateServiceForm, open]);

  const handleOk = () => {
    updateServiceForm.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateServiceSubmit = (values: any) => {
    console.log(values);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <Space className="text-base">
          <EditOutlined />
          <div className="uppercase text-secondary">Cập nhật gói dịch vụ</div>
        </Space>
      }
      open={open}
      afterClose={updateServiceForm.resetFields}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={null}
      maskClosable={false}
      modalRender={(dom) => (
        <Form
          form={updateServiceForm}
          initialValues={initialValuesUpdateService}
          name="UpdateServiceForm"
          onFinish={handleUpdateServiceSubmit}
        >
          {dom}
        </Form>
      )}
    >
      <Space direction="vertical" className="w-full">
        <ImageUpload images={images} setImages={setImages} />
        <Form.Item
          name="Name"
          label={<div className="text-sm text-secondary">Tên gói dịch vụ</div>}
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
          label={<div className="text-sm text-secondary">Số lần sửa chữa</div>}
          rules={[
            {
              type: "number",
              required: true,
              min: 1,
              whitespace: true,
              message: "Số lần sửa chữa không hợp lệ",
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
  );
}

type UpdateServiceModalProps = {
  open?: boolean;
  setIsModalOpen?: any;
  record: ServicePackage;
};
