import { Col, Row } from "antd";
import { Divider } from "../divider";
import React, { ReactNode } from "react";
import { ColProps } from "antd/lib";

export default function Grid(props: CustomGridProps) {
  const numOfCol = props.items.length;
  const totalDividerSpan = 2 * (numOfCol - 1);
  const totalColSpan = 24 - totalDividerSpan;
  const colSpan = Math.floor(totalColSpan / numOfCol);

  return (
    <Row>
      {props.items.map((item, index) => (
        <React.Fragment key={index}>
          <Col span={props.colSpan ?? colSpan} className={props.className}>
            {item}
          </Col>
          {index != numOfCol - 1 && (
            <Col span={2}>
              {props.divider ?? (
                <Divider type="vertical" className="h-full bg-black" />
              )}
            </Col>
          )}
        </React.Fragment>
      ))}
    </Row>
  );
}

type CustomGridProps = {
  items: any[];
  colSpan?: ColProps["span"];
  divider?: ReactNode;
  className?: string;
};
