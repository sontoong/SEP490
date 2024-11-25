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
import { useProduct } from "../../../hooks/useProduct";
import { AddProductParams } from "../../../redux/slice/productSlice";
import { getFiles } from "../../../utils/helpers";

export default function CreateNewProductModalButton() {
  const [createNewProductForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState<UploadImage[]>([]);
  const { state, handleAddProduct, handleGetAllProductPaginated } =
    useProduct();

  const initialValuesCreateNewProduct: AddProductParams = {
    Name: "",
    Description: "",
    Image: { name: "" },
    Price: 0,
    InOfStock: 0,
    WarantyMonths: 0,
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

  const handleCreateNewProductSubmit = async (values: AddProductParams) => {
    const Image = await getFiles(images);
    await handleAddProduct({
      values: {
        ...values,
        Image: Image[0],
      },
      callBackFn: () => {
        setIsModalVisible(false);
        handleGetAllProductPaginated({ PageIndex: 1, Pagesize: 8 });
      },
    });
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
            <div className="uppercase text-secondary">Tạo sản phẩm mới</div>
          </Space>
        }
        open={isModalVisible}
        afterClose={() => {
          createNewProductForm.resetFields();
          setImages([]);
        }}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: state.isSending }}
        cancelButtonProps={{ disabled: state.isSending }}
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
          <ImageUpload images={images} setImages={setImages} maxCount={1} />
          <Form.Item
            name="Name"
            label={<div className="text-sm text-secondary">Tên sản phẩm</div>}
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
                message: "Tên sản phẩm không được để trống",
              },
              {
                min: 4,
                message: "Tên sản phẩm phải có ít nhất 4 ký tự",
              },
            ]}
          >
            <Input placeholder="Nhập tên sản phẩm" size="large" />
          </Form.Item>
          <Form.Item
            name="Description"
            label={<div className="text-sm text-secondary">Mô tả</div>}
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
                message: "Mô tả không được để trống",
              },
            ]}
          >
            <TextEditor />
          </Form.Item>
          <Form.Item
            name="Price"
            label={<div className="text-sm text-secondary">Giá hiện tại</div>}
            rules={[
              {
                type: "number",
                required: true,
                min: 2000,
                message: "Giá sản phẩm phải ít nhất 2.000đ",
              },
            ]}
          >
            <InputNumber.Currency
              placeholder="Nhập giá của gói"
              className="w-1/2"
              step={1000}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="InOfStock"
            label={<div className="text-sm text-secondary">Số lượng</div>}
            rules={[
              {
                type: "number",
                min: 0,
                required: true,
                message: "Số lượng không hợp lệ",
              },
            ]}
          >
            <InputNumber
              placeholder="Nhập số lượng"
              className="w-1/2"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="WarantyMonths"
            label={
              <div className="text-sm text-secondary">Số tháng bảo hành</div>
            }
            rules={[
              {
                type: "number",
                min: 0,
                required: true,
                message: "Số tháng bảo hành không hợp lệ",
              },
            ]}
          >
            <InputNumber
              placeholder="Nhập số tháng"
              className="w-1/2"
              size="large"
            />
          </Form.Item>
        </Space>
      </Modal>
    </>
  );
}
