import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { interfaceOptions, TypeOptions } from '@/data';
import InputControl from '@/components/control/input/InputControl';
import RadioControl from '@/components/control/radio/RadioControl';
const { Title } = Typography;

interface Props {
    index: number;
    name: string;
    onRemove: (index: number) => void;
}

function FormSearchCreateCard(props: Props) {
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
                    <Col sm={24} xs={24} md={8}>
                        <InputControl name={`${name}[${index}].key`} label="Key" />
                    </Col>
                    <Col sm={24} xs={24} md={8}>
                        <InputControl name={`${name}[${index}].title`} label="Title" />
                    </Col>
                    <Col sm={24} xs={24} md={8}>
                        <RadioControl
                            name={`${name}[${index}].type`}
                            label="Type"
                            childProps={{
                                options: TypeOptions,
                            }}
                        />
                    </Col>
                    <Col sm={24} xs={24} md={24}>
                        <RadioControl
                            name={`${name}[${index}].interface`}
                            label="Interface"
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

export default FormSearchCreateCard;
