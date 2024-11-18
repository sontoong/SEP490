import { Input, Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { HomeOutlined, PhoneFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TextEditor } from "../../../components/rte";
import { ImageUpload } from "../../../components/image-upload";
import { UploadImage } from "../../../components/image-upload/image-upload";
import { InputSelect } from "../../../components/inputs";
import { Avatar } from "../../../components/avatar";
import { Apartment } from "../../../models/apartment";
import { getFiles, validateImageString } from "../../../utils/helpers";
import { useApartment } from "../../../hooks/useApartment";
import { UpdateApartmentParams } from "../../../redux/slice/apartmentSlice";
import { useAccount } from "../../../hooks/useAccount";
import { Skeleton } from "../../../components/skeletons";
import { Leader } from "../../../models/user";

export default function UpdateApartmentModal({
  apartment,
  isModalVisible,
  setIsModalVisible,
}: UpdateApartmentModalProps) {
  const [updateApartmentForm] = Form.useForm();
  const [images, setImages] = useState<UploadImage[]>([]);
  const { state: accountState, handleGetAllLeaderPaginated } = useAccount();
  const {
    state: apartmentState,
    handleUpdateApartment,
    handleGetAllApartmentsPaginated,
  } = useApartment();

  useEffect(() => {
    if (isModalVisible) {
      handleGetAllLeaderPaginated({ PageIndex: 1, Pagesize: 1000 });
    }
  }, [handleGetAllLeaderPaginated, isModalVisible]);

  const initialValuesUpdateNewApartment: UpdateApartmentParams = {
    Name: "",
    Address: "",
    ManagementCompany: "",
    Description: "",
    LeaderId: "",
    AreaId: "",
    Image: { name: "" },
  };

  useEffect(() => {
    updateApartmentForm.setFieldsValue({
      Name: apartment.name,
      Address: apartment.address,
      ManagementCompany: apartment.managementCompany,
      Description: apartment.description,
      LeaderId: apartment.leaderId,
    });
    if (apartment.avatarUrl) {
      setImages([
        {
          name: "",
          url: validateImageString(apartment.avatarUrl),
        },
      ]);
    }
  }, [apartment, updateApartmentForm, isModalVisible]);

  const handleOk = async () => {
    updateApartmentForm.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateNewServiceSubmit = async (values: any) => {
    const Image = await getFiles(images);
    handleUpdateApartment({
      values: {
        ...values,
        AreaId: apartment.areaId,
        ProductId: apartment.leaderId,
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
      <Modal
        title={
          <Space className="text-base">
            <HomeOutlined />
            <div className="uppercase text-secondary">Chỉnh sửa chung cư</div>
          </Space>
        }
        open={isModalVisible}
        afterClose={() => {
          updateApartmentForm.resetFields();
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
            form={updateApartmentForm}
            initialValues={initialValuesUpdateNewApartment}
            name="UpdateServiceForm"
            onFinish={handleUpdateNewServiceSubmit}
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
                options={(accountState.currentLeaderList.users as Leader[]).map(
                  (leader) => ({
                    label: `${leader.fullName} - ${leader.email} ${leader.areaId ? `(${leader.name})` : ""}`,
                    value: leader?.accountId,
                  }),
                )}
                loading={accountState.isFetching}
                allowClear
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

type UpdateApartmentModalProps = {
  isModalVisible?: boolean;
  setIsModalVisible?: any;
  apartment: Apartment;
};
