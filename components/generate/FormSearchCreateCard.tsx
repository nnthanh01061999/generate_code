import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { interfaceOptions, TypeOptions } from '@/data';
import CustomInput from '../form/CustomInput';
import CustomRadio from '../form/CustomRadio';
const { Title } = Typography;

interface Props {
    index: number;
    name: string;
    onRemove: (index: number) => void;
}

function FormSearchCreateCard(props: Props) {
    const { index, name, onRemove } = props;
    return (
        <Col md={24}>
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
                    <Col span={8}>
                        <CustomInput name={`${name}[${index}].key`} label="Key" />
                    </Col>
                    <Col span={8}>
                        <CustomInput name={`${name}[${index}].title`} label="Title" />
                    </Col>
                    <Col span={8}>
                        <CustomRadio
                            name={`${name}[${index}].type`}
                            label="Type"
                            childProps={{
                                options: TypeOptions,
                            }}
                        />
                    </Col>
                    <Col span={24}>
                        <CustomRadio
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
