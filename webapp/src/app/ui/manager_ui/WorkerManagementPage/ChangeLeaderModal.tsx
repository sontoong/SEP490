import { Space } from "antd";
import { Modal } from "../../../components/modals";
import { Form } from "../../../components/form";
import { InputSelect } from "../../../components/inputs";
import { Leader } from "../../../models/user";
import { leaders } from "../../../../constants/testData";
import { EditOutlined, PhoneFilled } from "@ant-design/icons";
import { Avatar } from "../../../components/avatar";

export default function ChangeLeaderModal({
  open = false,
  setIsModalOpen,
}: ChangeLeaderModalProps) {
  const [changeLeaderForm] = Form.useForm();

  const leaderId = Form.useWatch("leader", changeLeaderForm);

  const currentLeader = leaders.find(
    (leader: Leader) => leader.LeaderId === leaderId,
  );

  const handleOk = () => {
    changeLeaderForm.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const initialValuesChangeLeader = {
    leader: "",
  };

  const handleChangeLeaderSubmit = (values: any) => {
    console.log(values);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <Space className="text-base">
          <EditOutlined />
          <div className="uppercase text-secondary">Giao cho leader</div>
        </Space>
      }
      open={open}
      afterClose={changeLeaderForm.resetFields}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={null}
      maskClosable={false}
      modalRender={(dom) => (
        <Form
          form={changeLeaderForm}
          initialValues={initialValuesChangeLeader}
          name="ChangeLeaderForm"
          onFinish={handleChangeLeaderSubmit}
        >
          {dom}
        </Form>
      )}
    >
      <Space direction="vertical" className="w-full">
        <div className="text-sm text-secondary">Leader</div>
        <Form.Item
          noStyle
          name="leader"
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
              <div className="text-lg font-bold">{currentLeader?.Fullname}</div>
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
    </Modal>
  );
}

type ChangeLeaderModalProps = {
  open?: boolean;
  setIsModalOpen?: any;
};
