import { Space } from "antd";
import { Modal } from "../../../components/modals";
import { Form } from "../../../components/form";
import { Input, InputNumber } from "../../../components/inputs";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Product } from "../../../models/product";
import { UploadImage } from "../../../components/image-upload/image-upload";
import { ensureBase64Avatar } from "../../../utils/helpers";
import { ImageUpload } from "../../../components/image-upload";
import { TextEditor } from "../../../components/rte";

export default function UpdateProductModal({
  open = false,
  setIsModalOpen,
  product,
}: UpdateProductModalProps) {
  const [updateProductForm] = Form.useForm();
  const [images, setImages] = useState<UploadImage[]>([]);

  const initialValuesUpdateProduct = {
    Name: "",
    Description: "",
    ProductPrices: {
      PriceByDate: 0,
    },
    In_Of_stock: 0,
    WarrantyMonths: 0,
  };

  useEffect(() => {
    updateProductForm.setFieldsValue({
      Name: product.Name,
      Description: product.Description,
      ProductPrices: {
        PriceByDate: product.ProductPrices.PriceByDate,
      },
      In_Of_stock: product.In_Of_stock,
      WarrantyMonths: product.WarrantyMonths,
    });
    if (product.ImageUrl) {
      setImages([
        {
          name: "",
          url: ensureBase64Avatar(product.ImageUrl),
        },
      ]);
    }
  }, [product, product.ImageUrl, updateProductForm, open]);

  const handleOk = () => {
    updateProductForm.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProductSubmit = (values: any) => {
    console.log(values);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <Space className="text-base">
          <EditOutlined />
          <div className="uppercase text-secondary">Cập nhật sẩn phẩm</div>
        </Space>
      }
      open={open}
      afterClose={updateProductForm.resetFields}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={null}
      maskClosable={false}
      modalRender={(dom) => (
        <Form
          form={updateProductForm}
          initialValues={initialValuesUpdateProduct}
          name="UpdateProductForm"
          onFinish={handleUpdateProductSubmit}
        >
          {dom}
        </Form>
      )}
    >
      <Space direction="vertical" className="w-full">
        <ImageUpload images={images} setImages={setImages} />
        <Form.Item
          name="Name"
          label={<div className="text-sm text-secondary">Tên sản phẩm</div>}
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
          name={["ProductPrices", "PriceByDate"]}
          label={<div className="text-sm text-secondary">Giá hiện tại</div>}
          rules={[{ type: "number", required: true, min: 1000 }]}
        >
          <InputNumber.Currency
            placeholder="Nhập giá của gói"
            className="w-1/2"
            step={1000}
          />
        </Form.Item>
        <Form.Item
          name="In_Of_stock"
          label={<div className="text-sm text-secondary">Số lượng</div>}
          rules={[
            {
              type: "number",
              min: 0,
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Nhập số lượng" className="w-1/2" />
        </Form.Item>
        <Form.Item
          name="WarrantyMonths"
          label={
            <div className="text-sm text-secondary">Số tháng bảo hành</div>
          }
          rules={[
            {
              type: "number",
              min: 0,
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="Nhập số tháng" className="w-1/2" />
        </Form.Item>
      </Space>
    </Modal>
  );
}

type UpdateProductModalProps = {
  open?: boolean;
  setIsModalOpen?: any;
  product: Product;
};
