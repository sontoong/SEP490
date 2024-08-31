import { Button, ButtonProps, ConfigProvider } from "antd";

function OutlineButton({ text, ...rest }: CustomButtonProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            algorithm: true,
            defaultColor: "#004aad",
            defaultBorderColor: "#004aad",
          },
        },
      }}
    >
      <Button type="default" size="large" {...rest}>
        {text}
      </Button>
    </ConfigProvider>
  );
}

function OutlineButtonBoldText({ text, ...rest }: CustomButtonProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            algorithm: true,
            defaultColor: "#004aad",
            defaultBorderColor: "#004aad",
          },
        },
      }}
    >
      <Button type="default" size="large" {...rest}>
        <span className="font-bold">{text}</span>
      </Button>
    </ConfigProvider>
  );
}

OutlineButton.BoldText = OutlineButtonBoldText;

export default OutlineButton;

type CustomButtonProps = ButtonProps & {
  text?: string;
};
