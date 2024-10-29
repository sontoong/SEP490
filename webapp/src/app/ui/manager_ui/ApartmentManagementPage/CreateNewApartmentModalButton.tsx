import { Input, Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { PrimaryButton } from "../../../components/buttons";
import {
  HomeOutlined,
  PhoneFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { TextEditor } from "../../../components/rte";
import { ImageUpload } from "../../../components/image-upload";
import { UploadImage } from "../../../components/image-upload/image-upload";
import { InputSelect } from "../../../components/inputs";
import { leaders } from "../../../../constants/testData";
import { Avatar } from "../../../components/avatar";
import { Leader } from "../../../models/user";

export default function CreateNewApartmentModalButton() {
  const [createNewApartmentForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState<UploadImage[]>([]);

  const leaderId = Form.useWatch("LeaderId", createNewApartmentForm);

  const currentLeader = leaders.find(
    (leader: Leader) => leader.LeaderId === leaderId,
  );

  const initialValuesCreateNewApartment: any = {
    Name: "",
    Address: "",
    ManagementCompany: "",
    Description: "",
    LeaderId: null,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    createNewApartmentForm.submit();
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
        text="Thêm chung cư mới"
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      />
      <Modal
        title={
          <Space className="text-base">
            <HomeOutlined />
            <div className="uppercase text-secondary">Thêm chung cư mới</div>
          </Space>
        }
        open={isModalVisible}
        afterClose={createNewApartmentForm.resetFields}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        maskClosable={false}
        modalRender={(dom) => (
          <Form
            form={createNewApartmentForm}
            initialValues={initialValuesCreateNewApartment}
            name="UpdateServiceForm"
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
              label={<div className="text-sm text-secondary">Trưởng nhóm</div>}
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
