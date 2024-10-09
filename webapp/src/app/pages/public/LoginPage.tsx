import { Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/buttons";
import { Form } from "../../components/form";
import { Input } from "../../components/inputs";
import { useAuth } from "../../hooks/useAuth";
import { LoginParams } from "../../redux/slice/authSlice";
import LoginBackground from "../../../assets/images/login_background.png";
import { ScreenCard } from "../../components/card";
import { useTitle } from "../../hooks/useTitle";

export default function LoginPage() {
  useTitle({ tabTitle: "Login - EWMH" });
  const navigate = useNavigate();
  const { state: stateAuth, handleLogin } = useAuth();

  const [form] = Form.useForm();

  const initialValues: LoginParams = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginParams) => {
    handleLogin(values, navigate);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <img
        src={LoginBackground}
        className="absolute h-full w-full object-cover"
      />
      <ScreenCard
        cardTitle={"Hệ thống quản lí EWMH"}
        className="w-1/3"
        bordered={false}
      >
        <div className="px-5">
          <Space direction="vertical" size="large" className="w-full">
            <div>
              <Form
                form={form}
                initialValues={initialValues}
                name="LoginPage"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="email"
                  label={
                    <Space>
                      <UserOutlined />
                      <span>Email</span>
                    </Space>
                  }
                  rules={[
                    {
                      type: "email",
                      required: true,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Nhập Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={
                    <Space>
                      <LockOutlined />
                      <span>Mật khẩu</span>
                    </Space>
                  }
                  rules={[
                    {
                      type: "string",
                      required: true,
                      whitespace: true,
                    },
                  ]}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
              </Form>
              <Link to="/forgot-password">
                <span className="underline">Đổi mật khẩu</span>
              </Link>
            </div>
            <div className="flex justify-center">
              <PrimaryButton.BoldText
                text="Đăng nhập"
                loading={stateAuth.isSending}
                onClick={() => form.submit()}
                className="w-full"
              />
            </div>
          </Space>
        </div>
      </ScreenCard>
    </div>
  );
}
