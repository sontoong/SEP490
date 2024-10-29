import { Input, Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { HomeOutlined, PhoneFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TextEditor } from "../../../components/rte";
import { ImageUpload } from "../../../components/image-upload";
import { UploadImage } from "../../../components/image-upload/image-upload";
import { InputSelect } from "../../../components/inputs";
import { leaders } from "../../../../constants/testData";
import { Avatar } from "../../../components/avatar";
import { Leader } from "../../../models/user";
import { ApartmentArea } from "../../../models/apartmentArea";
import { ensureBase64Avatar } from "../../../utils/helpers";

export default function UpdateApartmentModal({
  apartment,
  isModalVisible,
  setIsModalVisible,
}: UpdateApartmentModalProps) {
  const [updateApartmentForm] = Form.useForm();
  const [images, setImages] = useState<UploadImage[]>([]);

  const leaderId = Form.useWatch("LeaderId", updateApartmentForm);
  const currentLeader = leaders.find(
    (leader: Leader) => leader.LeaderId === leaderId,
  );

  const initialValuesUpdateNewApartment: any = {
    Name: "",
    Address: "",
    ManagementCompany: "",
    Description: "",
    LeaderId: "",
  };

  useEffect(() => {
    updateApartmentForm.setFieldsValue({
      Name: apartment.Name,
      Address: apartment.Address,
      ManagementCompany: apartment.ManagementCompany,
      Description: apartment.Description,
      LeaderId: apartment.LeaderId,
    });
    if (apartment.AvatarUrl) {
      setImages([
        {
          name: "",
          url: ensureBase64Avatar(apartment.AvatarUrl),
        },
      ]);
    }
  }, [
    apartment.Address,
    apartment.AvatarUrl,
    apartment.Description,
    apartment.LeaderId,
    apartment.ManagementCompany,
    apartment.Name,
    updateApartmentForm,
    isModalVisible,
  ]);

  const handleOk = async () => {
    updateApartmentForm.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateNewServiceSubmit = (values: any) => {
    console.log(values);
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={
          <Space className="text-base">
            <HomeOutlined />
            <div className="uppercase text-secondary">Thêm chung cư mới</div>
          </Space>
        }
        open={isModalVisible}
        afterClose={updateApartmentForm.resetFields}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        maskClosable={false}
        modalRender={(dom) => (
          <Form
            form={updateApartmentForm}
            initialValues={initialValuesUpdateNewApartment}
            name="UpdateServiceForm"
            onFinish={handleUpdateNewServiceSubmit}
          >
            {dom}
          </Form>
        )}
      >
        <Space direction="vertical" className="w-full">
          <ImageUpload images={images} setImages={setImages} />
          <Form.Item
            name="Name"
            label={<div className="text-sm text-secondary">Tên chung cư</div>}
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Nhập tên chung cư" />
          </Form.Item>
          <Form.Item
            name="Address"
            label={<div className="text-sm text-secondary">Địa chỉ</div>}
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            name="ManagementCompany"
            label={<div className="text-sm text-secondary">Công ty</div>}
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Nhập tên công ty" />
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
          <Space direction="vertical" className="w-full">
            <Form.Item
              name="LeaderId"
              label={<div className="text-sm text-secondary">Leader</div>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputSelect
                className="w-full"
                placeholder="Chọn leader"
                options={leaders.map((leader: Leader) => ({
                  label: leader.Fullname,
                  value: leader.LeaderId,
                }))}
              />
            </Form.Item>
            {leaderId && (
              <div className="rounded-lg border-2 border-solid border-secondary p-2">
                <Space direction="vertical" className="text-sm">
                  <Avatar size={80} src={currentLeader?.AvatarUrl} />
                  <div className="text-lg font-bold">
                    {currentLeader?.Fullname}
                  </div>
                  <Space>
                    <div>
                      <span className="font-bold">Email: </span>
                      <span>{currentLeader?.Email}</span>
                    </div>
                    <div>
                      <Space>
                        <PhoneFilled />
                        <span className="font-bold">SĐT: </span>
                        <span className="whitespace-nowrap">
                          {currentLeader?.PhoneNumber}
                        </span>
                      </Space>
                    </div>
                  </Space>
                </Space>
              </div>
            )}
          </Space>
        </Space>
      </Modal>
    </>
  );
}

type UpdateApartmentModalProps = {
  isModalVisible?: boolean;
  setIsModalVisible?: any;
  apartment: ApartmentArea;
};
