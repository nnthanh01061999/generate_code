import { Col, Row, Typography } from 'antd';
import React from 'react';
import CustomInput from '@/components/form/CustomInput';
const { Title } = Typography;

function Common() {
    return (
        <>
            <Title level={2}>Common</Title>
            <Row gutter={[24, 0]}>
                <Col md={12} sm={24} xs={24}>
                    <CustomInput name="title" label="Title" />
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <CustomInput name="key" label="Key" wrapperProps={{ tooltip: 'camelCase' }} />
                </Col>
            </Row>
        </>
    );
}

export default Common;
