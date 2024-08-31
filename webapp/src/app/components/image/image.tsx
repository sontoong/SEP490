import { Image, ImageProps } from "antd";
import { defaultImage } from "../../../constants/images";
import { ensureBase64Avatar } from "../../utils/helpers";

function CustomImage(props: CustomImageProps) {
  const { src, preview = false, ...rest } = props;
  return (
    <Image
      src={ensureBase64Avatar(src) ?? "error"}
      fallback={defaultImage}
      preview={preview}
      {...rest}
    />
  );
}

export default CustomImage;

type CustomImageProps = Omit<ImageProps, "src" | "fallback"> & {
  src?: ImageProps["src"];
};
