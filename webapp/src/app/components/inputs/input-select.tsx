import { Select, SelectProps } from "antd";

export function CustomSelectTag(props: CustomSelectProps) {
  return <Select mode="multiple" allowClear {...props} />;
}

export function CustomSelect(props: CustomSelectProps) {
  return <Select allowClear {...props} />;
}

CustomSelect.Tag = CustomSelectTag;
CustomSelect.Option = Select.Option;

export default CustomSelect;

type CustomSelectProps = Omit<SelectProps, "style">;
