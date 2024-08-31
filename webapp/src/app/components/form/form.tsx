import { Form, FormProps } from "antd";
import { RequiredFields } from "../../utils/types";

interface DefaultFormProps
  extends Omit<
    RequiredFields<FormProps, "initialValues" | "name">,
    "layout" | "scrollToFirstError"
  > {}

function DefaultForm(props: DefaultFormProps) {
  const { children } = props;
  return (
    <Form
      {...props}
      layout="vertical"
      scrollToFirstError={{
        behavior: "smooth",
        block: "center",
        inline: "center",
      }}
      requiredMark="optional"
    >
      <>{children}</>
    </Form>
  );
}

DefaultForm.useWatch = Form.useWatch;
DefaultForm.Item = Form.Item;
DefaultForm.useForm = Form.useForm;
DefaultForm.Provider = Form.Provider;
DefaultForm.List = Form.List;

export default DefaultForm;
