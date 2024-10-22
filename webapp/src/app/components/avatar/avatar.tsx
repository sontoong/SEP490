import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, AvatarProps, ConfigProvider } from "antd";
import { ensureBase64Avatar } from "../../utils/helpers";

function CustomAvatar(props: CustomAvatarProps) {
  const { src, size, className, shape } = props;
  return (
    <ConfigProvider theme={{ token: { colorTextPlaceholder: "#bfbfbf" } }}>
      <Avatar
        size={size}
        src={ensureBase64Avatar(src)}
        icon={shape === "square" ? <FileOutlined /> : <UserOutlined />}
        className={className}
        shape={shape}
      />
    </ConfigProvider>
  );
}

export default CustomAvatar;

type CustomAvatarProps = {
  src?: string;
  size: AvatarProps["size"];
  className?: AvatarProps["className"];
  shape?: AvatarProps["shape"];
};
