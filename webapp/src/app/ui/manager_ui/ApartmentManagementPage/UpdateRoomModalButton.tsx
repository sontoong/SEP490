import { Space } from "antd";
import { Form } from "../../../components/form";
import { Modal } from "../../../components/modals";
import { EditOutlined, HomeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Input } from "../../../components/inputs";
import { useApartment } from "../../../hooks/useApartment";

export default function EditRoomModalButton({
  areaId,
  oldRoomId,
}: {
  areaId: string;
  oldRoomId: string;
}) {
  const [addRoomForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state, handleUpdateRoom, handleGetAllRoomsPaginated } =
    useApartment();

  const initialValuesCreateNewApartment: any = {
    newRoomId: oldRoomId,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    addRoomForm.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateRoomSubmit = (values: any) => {
    const newRoomId = values.newRoomId;
    handleUpdateRoom({
      values: { areaId: areaId, newRoomId: newRoomId, oldRoomId: oldRoomId },
      callBackFn: () => {
        setIsModalVisible(false);
        handleGetAllRoomsPaginated({
          PageIndex: 1,
          Pagesize: 8,
          AreaId: areaId,
        });
      },
    });
  };

  return (
    <>
      <EditOutlined onClick={showModal} />
      <Modal
        title={
          <Space className="text-base">
            <HomeOutlined />
            <div className="uppercase text-secondary">Cập nhật số phòng</div>
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
            initialValues={initialValuesCreateNewApartment}
            name="AddRoomForm"
            onFinish={handleUpdateRoomSubmit}
          >
            {dom}
          </Form>
        )}
      >
        <Space direction="vertical" className="w-full">
          <div>
            <Form.Item
              name="newRoomId"
              label={<div className="text-sm text-secondary">Số phòng</div>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Nhập số phòng mới" size="large" />
            </Form.Item>
          </div>
        </Space>
      </Modal>
    </>
  );
}
