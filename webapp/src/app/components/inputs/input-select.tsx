import { Select, SelectProps } from "antd";

export function CustomSelect(props: CustomSelectProps) {
  return <Select optionFilterProp="label" showSearch allowClear {...props} />;
}

export function CustomSelectTag(props: CustomSelectProps) {
  return (
    <Select
      optionFilterProp="label"
      showSearch
      mode="multiple"
      allowClear
      {...props}
    />
  );
}

CustomSelect.Tag = CustomSelectTag;

export default CustomSelect;

type CustomSelectProps = Omit<SelectProps, "style">;
