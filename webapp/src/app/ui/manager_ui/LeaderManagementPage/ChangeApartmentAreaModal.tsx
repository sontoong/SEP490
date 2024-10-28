import { Space } from "antd";
import { Modal } from "../../../components/modals";
import { Form } from "../../../components/form";
import { InputSelect } from "../../../components/inputs";
import { ApartmentArea } from "../../../models/apartmentArea";
import { apartmentAreas } from "../../../../constants/testData";
import { EditOutlined, EnvironmentFilled } from "@ant-design/icons";

export default function ChangeApartmentAreaModal({
  open = false,
  setIsModalOpen,
}: ChangeApartmentModalProps) {
  const [changeApartmentForm] = Form.useForm();

  const apartmentAreaId = Form.useWatch("apartmentArea", changeApartmentForm);
  const currentApartmentArea = apartmentAreas.find(
    (apartmentArea: ApartmentArea) => apartmentArea.AreaId === apartmentAreaId,
  );

  const handleOk = () => {
    changeApartmentForm.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const initialValuesChangeApartmentArea = {
    apartmentArea: "",
  };

  const handleChangeApartmentAreaSubmit = (values: any) => {
    console.log(values);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <Space className="text-base">
          <EditOutlined />
          <div className="uppercase text-secondary">Đổi chung cư</div>
        </Space>
      }
      open={open}
      afterClose={changeApartmentForm.resetFields}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={null}
      maskClosable={false}
      modalRender={(dom) => (
        <Form
          form={changeApartmentForm}
          initialValues={initialValuesChangeApartmentArea}
          name="ChangeApartmentAreaForm"
          onFinish={handleChangeApartmentAreaSubmit}
        >
          {dom}
        </Form>
      )}
    >
      <Space direction="vertical" className="w-full">
        <Form.Item
          label={<div className="text-sm text-secondary">Chung cư</div>}
          name="apartmentArea"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputSelect
            className="w-full"
            placeholder="Chọn chung cư"
            options={apartmentAreas.map((apartmentArea: ApartmentArea) => ({
              label: apartmentArea.Name,
              value: apartmentArea.AreaId,
            }))}
          />
        </Form.Item>
        {apartmentAreaId && (
          <div className="rounded-lg border-2 border-solid border-secondary p-2">
            <Space direction="vertical" className="text-sm">
              <div className="text-lg font-bold">
                {currentApartmentArea?.Name}
              </div>
              <div>
                <Space>
                  <EnvironmentFilled />
                  <span className="font-bold">Công ty quản lý: </span>
                  <span>{currentApartmentArea?.ManagementCompany}</span>
                </Space>
              </div>
              <div>
                <span className="font-bold">Địa chỉ: </span>
                {currentApartmentArea?.Address}
              </div>
              <div>
                <span className="font-bold">Mô tả: </span>
                {currentApartmentArea?.Description}
              </div>
            </Space>
          </div>
        )}
      </Space>
    </Modal>
  );
}

type ChangeApartmentModalProps = {
  open?: boolean;
  setIsModalOpen?: any;
};
