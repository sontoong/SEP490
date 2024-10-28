import { Button, ButtonProps, ConfigProvider, theme } from "antd";

function PrimaryButton({ text, bgColor, ...rest }: CustomButtonProps) {
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: bgColor ?? token.colorPrimary,
            algorithm: true,
          },
        },
      }}
    >
      <Button type="primary" size="large" {...rest}>
        {text}
      </Button>
    </ConfigProvider>
  );
}

function PrimaryButtonBoldText({ text, bgColor, ...rest }: CustomButtonProps) {
  const { token } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: bgColor ?? token.colorPrimary,
          },
        },
      }}
    >
      <Button type="primary" size="large" {...rest}>
        <span className="font-bold">{text}</span>
      </Button>
    </ConfigProvider>
  );
}

PrimaryButton.BoldText = PrimaryButtonBoldText;

export default PrimaryButton;

type CustomButtonProps = Omit<ButtonProps, "children"> & {
  text?: string;
  bgColor?: string;
};
