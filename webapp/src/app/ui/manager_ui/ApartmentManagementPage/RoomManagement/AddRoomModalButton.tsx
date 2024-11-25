import { Space, Typography } from "antd";
import { Form } from "../../../../components/form";
import { Modal } from "../../../../components/modals";
import { PrimaryButton } from "../../../../components/buttons";
import {
  CloseOutlined,
  HomeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Input } from "../../../../components/inputs";
import { AddRoomsParams } from "../../../../redux/slice/apartmentSlice";
import { useApartment } from "../../../../hooks/useApartment";

const { Text } = Typography;

export default function AddRoomModalButton({
  apartmentId,
}: {
  apartmentId: string;
}) {
  const [addRoomForm] = Form.useForm();
  const { state, handleAddRooms, handleGetAllRoomsPaginated } = useApartment();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialValuesAddNewRoom: AddRoomsParams = {
    areaId: "",
    roomIds: [],
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const roomIds = addRoomForm.getFieldValue("roomIds");
    handleAddRooms({
      values: {
        areaId: apartmentId,
        roomIds: roomIds,
      },
      callBackFn: () => {
        setIsModalVisible(false);
        handleGetAllRoomsPaginated({
          PageIndex: 1,
          Pagesize: 8,
          AreaId: apartmentId,
        });
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <PrimaryButton
        text="Thêm căn hộ mới"
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      />
      <Modal
        title={
          <Space className="text-base">
            <HomeOutlined />
            <div className="uppercase text-secondary">Thêm căn hộ mới</div>
          </Space>
        }
        open={isModalVisible}
        afterClose={addRoomForm.resetFields}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: state.isSending }}
        cancelButtonProps={{ disabled: state.isSending }}
        closeIcon={null}
        maskClosable={false}
        modalRender={(dom) => (
          <Form
            form={addRoomForm}
            initialValues={initialValuesAddNewRoom}
            name="AddRoomForm"
            onFinish={(values) => {
              const { roomId, roomIds } = values;
              const add = (roomId: string) => {
                addRoomForm.setFieldsValue({
                  roomIds: [...roomIds, roomId],
                });
              };
              addRoomForm.validateFields().then(() => add(roomId));
              addRoomForm.setFieldValue("roomId", null);
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Space direction="vertical" className="w-full">
          <Space direction="vertical" className="w-full">
            <Form.Item
              name="roomId"
              label={<div className="text-sm text-secondary">Số căn hộ</div>}
              rules={[
                {
                  type: "string",
                  required: true,
                  max: 10,
                },
              ]}
              className="mb-0"
            >
              <Input
                placeholder="Nhập số căn hộ"
                size="large"
                className="w-full"
              />
            </Form.Item>
            <Form.List name="roomIds">
              {(fields, { remove }) => {
                return (
                  <div className="flex flex-col gap-2">
                    <Form.Item
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.roomId !== curValues.roomId
                      }
                      noStyle
                    >
                      <PrimaryButton
                        htmlType="submit"
                        text="Thêm căn hộ"
                        className="w-full"
                        icon={<PlusCircleOutlined />}
                        bgColor="#4cc9c7"
                      />
                    </Form.Item>
                    <div>{`Danh sách căn hộ (${fields.length} căn hộ)`}</div>
                    {fields.length ? (
                      fields.map((field) => (
                        <Space className="w-fit" key={field.key}>
                          <Form.Item
                            shouldUpdate={(prevValues, curValues) =>
                              prevValues.roomIds !== curValues.roomIds
                            }
                            noStyle
                          >
                            {({ getFieldValue }) => {
                              const roomIds = getFieldValue("roomIds");
                              return (
                                <span className="text-sm">{`${roomIds[field.name]}`}</span>
                              );
                            }}
                          </Form.Item>
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Space>
                      ))
                    ) : (
                      <Text className="ant-form-text" type="secondary">
                        ( Chưa có căn hộ. )
                      </Text>
                    )}
                  </div>
                );
              }}
            </Form.List>
          </Space>
        </Space>
      </Modal>
    </>
  );
}
