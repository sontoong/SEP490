import { UserOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider } from "antd";
import { AvatarProps } from "antd/lib";
import { ensureBase64Avatar } from "../../utils/helpers";

function CustomAvatar(props: CustomAvatarProps) {
  const { src, size, className } = props;
  return (
    <ConfigProvider theme={{ token: { colorTextPlaceholder: "#bfbfbf" } }}>
      <Avatar
        size={size}
        src={ensureBase64Avatar(src)}
        icon={<UserOutlined />}
        className={className}
      />
    </ConfigProvider>
  );
}

export default CustomAvatar;

type CustomAvatarProps = {
  src?: string;
  size: AvatarProps["size"];
  className?: AvatarProps["className"];
};
