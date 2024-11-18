import { Image, ImageProps } from "antd";
import { defaultImage } from "../../../constants/images";
import { validateImageString } from "../../utils/helpers";

function CustomImage(props: CustomImageProps) {
  const { src, preview = false, ...rest } = props;
  return (
    <Image
      src={validateImageString(src) ?? "error"}
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
