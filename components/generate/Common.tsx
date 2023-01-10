import { Row, Col, Typography } from "antd";
import React from "react";
import CustomInput from "../form/CustomInput";
const { Title } = Typography;

function Common() {
  return (
    <>
      <Title level={3}>Common</Title>
      <Row gutter={[24, 0]}>
        <Col md={12}>
          <CustomInput name="title" label="Title" />
        </Col>
        <Col md={12}>
          <CustomInput
            name="key"
            label="Key"
            wrapperProps={{ tooltip: "camelCase" }}
          />
        </Col>
      </Row>
    </>
  );
}

export default Common;
