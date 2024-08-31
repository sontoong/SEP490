import { App, GetProp, UploadFile, UploadProps } from "antd";
import { UploadImg } from "../inputs/upload-img";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function CustomUploadImage(props: {
  images: UploadFile[];
  setImages: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  maxCount?: UploadProps['maxCount'] ;
}) {
  const { message } = App.useApp();
  const { images, setImages, maxCount = 1 } = props;

  const onChange: UploadProps["onChange"] = ({ fileList }) => {
    setImages(fileList);
  };

  const uploadConditions = (file: FileType) => {
    if (file.type != "image/jpeg" && file.type != "image/png") {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    if (!file.size || file.size / 1024 / 1024 > 2) {
      message.error("Image must smaller than 2MB!");
      return false;
    }
    return true;
  };

  return (
    <UploadImg
      listType="picture-card"
      maxCount={maxCount}
      fileList={images}
      onChange={onChange}
      uploadConditions={uploadConditions}
    />
  );
}
