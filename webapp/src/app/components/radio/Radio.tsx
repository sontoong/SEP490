import React, { useState } from "react";
import NotFound from "../not-found/not-found";
import { Space } from "antd";
import { SpaceProps } from "antd/lib";

function Radio() {}

function RadioGroup<RecordType>({
  defaultActiveIndex,
  activeRender,
  items,
  render,
  gap = 10,
  direction = "horizontal",
}: RadioGroupProps<RecordType>) {
  const [selectedValue, setSelectedValue] = useState(defaultActiveIndex);

  const handleClick = (value: number) => {
    setSelectedValue(value);
  };

  if (Array.isArray(items)) {
    if (items.length === 0) {
      return <NotFound />;
    }
    return (
      <Space size={gap} direction={direction}>
        {items.map((item, index) => (
          <div key={index} onClick={() => handleClick(index)}>
            {index === selectedValue ? activeRender(item) : render(item)}
          </div>
        ))}
      </Space>
    );
  }
}

Radio.ButtonGroup = RadioGroup;

export default Radio;

type RadioGroupProps<RecordType> = {
  defaultActiveIndex?: number;
  items: RecordType[] | number;
  gap?: SpaceProps["size"];
  direction?: SpaceProps["direction"];
  render: (item?: RecordType) => React.ReactNode;
  activeRender: (item?: RecordType) => React.ReactNode;
};
