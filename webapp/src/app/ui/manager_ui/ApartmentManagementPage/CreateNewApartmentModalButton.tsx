import { Input, Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { PrimaryButton } from "../../../components/buttons";
import {
  HomeOutlined,
  PhoneFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TextEditor } from "../../../components/rte";
import { ImageUpload } from "../../../components/image-upload";
import { UploadImage } from "../../../components/image-upload/image-upload";
import { InputSelect } from "../../../components/inputs";
import { Avatar } from "../../../components/avatar";
import { useAccount } from "../../../hooks/useAccount";
import agent from "../../../services/agent";
import { Leader } from "../../../models/user";
import { AddApartmentParams } from "../../../redux/slice/apartmentSlice";
import { getFiles } from "../../../utils/helpers";
import { useApartment } from "../../../hooks/useApartment";
import { Skeleton } from "../../../components/skeletons";

export default function CreateNewApartmentModalButton() {
  const [createNewApartmentForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [images, setImages] = useState<UploadImage[]>([]);
  const { state: accountState, handleGetAllLeaderPaginated } = useAccount();
  const {
    state: apartmentState,
    handleAddApartment,
    handleGetAllApartmentsPaginated,
  } = useApartment();

  useEffect(() => {
    handleGetAllLeaderPaginated({ PageIndex: 1, Pagesize: 1000 });
  }, [handleGetAllLeaderPaginated]);

  const initialValuesCreateNewApartment: Partial<AddApartmentParams> = {
    Name: "",
    Address: "",
    ManagementCompany: "",
    Description: undefined,
    Image: { name: "" },
    LeaderId: undefined,
  };

  async function fetchLeaderList(
    email: string,
  ): Promise<{ label: string; value: string }[]> {
    return agent.Account.getAllLeaderPaginated({
      PageIndex: 1,
      Pagesize: 5,
      SearchByEmail: email,
    }).then((body) => {
      return body[0].map((leader: Leader) => ({
        label: `${leader.fullName} - ${leader.email} ${leader.areaId ? `(${leader.name})` : ""}`,
        value: leader.accountId,
      }));
    });
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    createNewApartmentForm.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateNewServiceSubmit = async (values: any) => {
    const Image = await getFiles(images);
    await handleAddApartment({
      values: {
        ...values,
        Image: Image[0],
      },
      callBackFn: () => {
        setIsModalVisible(false);
        handleGetAllApartmentsPaginated({ PageIndex: 1, Pagesize: 8 });
      },
    });
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
        afterClose={() => {
          createNewApartmentForm.resetFields();
          setImages([]);
        }}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: apartmentState.isSending }}
        cancelButtonProps={{ disabled: apartmentState.isSending }}
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
        width={650}
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
            <Input placeholder="Nhập tên chung cư" size="large" />
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
            <Input placeholder="Nhập địa chỉ" size="large" />
          </Form.Item>
          <Form.Item
            name="ManagementCompany"
            label={<div className="text-sm text-secondary">Công ty</div>}
            rules={[
              {
                type: "string",
                required: true,
                whitespace: true,
                min: 4,
              },
            ]}
          >
            <Input placeholder="Nhập tên công ty" size="large" />
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
            <TextEditor placeholder="Nhập mô tả" />
          </Form.Item>
          <Space direction="vertical" className="w-full" size={0}>
            <Form.Item
              name="LeaderId"
              label={<div className="text-sm text-secondary">Trưởng nhóm</div>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputSelect.Debounce
                className="w-full"
                placeholder="Tìm kiếm bằng email"
                fetchOptions={fetchLeaderList}
                allowClear
                size="large"
              />
            </Form.Item>
            <Form.Item
              shouldUpdate={(prev, cur) => prev.LeaderId !== cur.LeaderId}
            >
              {({ getFieldValue }) => {
                const leaderIdForm = getFieldValue("LeaderId");
                const currentLeader = (
                  accountState.currentLeaderList.users as Leader[]
                ).find((leader) => leader.accountId === leaderIdForm) as Leader;

                return leaderIdForm ? (
                  <div className="rounded-lg border-2 border-solid border-secondary p-2">
                    <Space direction="vertical" className="text-sm">
                      <Avatar
                        size={80}
                        src={currentLeader?.avatarUrl}
                        loading={accountState.isFetching}
                      />
                      {accountState.isFetching ? (
                        <Skeleton
                          title={{ width: 200 }}
                          paragraph={{ rows: 1, width: 400 }}
                        />
                      ) : (
                        <>
                          <div className="text-lg font-bold">
                            {currentLeader?.fullName}
                          </div>
                          <Space>
                            <div>
                              <span className="font-bold">email: </span>
                              <span>{currentLeader?.email}</span>
                            </div>
                            <div>
                              <Space>
                                <PhoneFilled />
                                <span className="font-bold">SĐT: </span>
                                <span className="whitespace-nowrap">
                                  {currentLeader?.phoneNumber}
                                </span>
                              </Space>
                            </div>
                          </Space>
                        </>
                      )}
                    </Space>
                  </div>
                ) : (
                  <></>
                );
              }}
            </Form.Item>
          </Space>
        </Space>
      </Modal>
    </>
  );
}
