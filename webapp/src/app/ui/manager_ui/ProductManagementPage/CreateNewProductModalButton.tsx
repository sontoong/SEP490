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

export default function CreateNewProductModalButton() {
  const [createNewProductForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState<UploadImage[]>([]);

  const initialValuesCreateNewProduct: any = {
    Name: "",
    Description: "",
    NumOfRequest: 0,
    Policy: "",
    ProductPrices: {
      PriceByDate: 0,
    },
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    createNewProductForm.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateNewProductSubmit = (values: any) => {
    console.log(values);
    setIsModalVisible(false);
  };

  return (
    <>
      <PrimaryButton
        text="Tạo sản phẩm mới"
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      />
      <Modal
        title={
          <Space className="text-base">
            <EditOutlined />
            <div className="uppercase text-secondary">Cập nhật sẩn phẩm</div>
          </Space>
        }
        open={isModalVisible}
        afterClose={createNewProductForm.resetFields}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        maskClosable={false}
        modalRender={(dom) => (
          <Form
            form={createNewProductForm}
            initialValues={initialValuesCreateNewProduct}
            name="UpdateProductForm"
            onFinish={handleCreateNewProductSubmit}
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
    </>
  );
}
