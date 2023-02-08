import CustomInput from '@/components/form/CustomInput';
import CustomRadio from '@/components/form/CustomRadio';
import { interfaceOptions } from '@/data';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export interface IActionPayloadItemProps {
    index: number;
    name: string;
    onRemove: (index: number) => void;
}

function ActionPayloadItem(props: IActionPayloadItemProps) {
    const { index, name, onRemove } = props;
    return (
        <Col md={24} sm={24} xs={24}>
            <Card
                title={
                    <Space
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Title level={4}>Field {index + 1}</Title>
                        <Button onClick={() => onRemove(index)}>Remove</Button>
                    </Space>
                }
            >
                <Row gutter={[24, 0]} align={'top'}>
                    <Col sm={24} xs={24} md={12}>
                        <CustomInput name={`${name}[${index}].key`} label="Key" />
                    </Col>
                    <Col sm={24} xs={24} md={12}>
                        <CustomRadio
                            name={`${name}[${index}].type`}
                            label="Type"
                            childProps={{
                                options: interfaceOptions,
                            }}
                        />
                    </Col>
                </Row>
            </Card>
        </Col>
    );
}

export default ActionPayloadItem;
