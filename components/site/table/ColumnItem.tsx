import CustomInput from '@/components/form/CustomInput';
import CustomInputNumber from '@/components/form/CustomInputNumber';
import CustomRadio from '@/components/form/CustomRadio';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export interface IColumnItemProps {
    index: number;
    name: string;
    first: boolean;
    last: boolean;
    onRemove: (index: number) => void;
    onSwap: (from: number, to: number) => void;
}

function ColumnItem(props: IColumnItemProps) {
    const { index, name, last, first, onRemove, onSwap } = props;
    return (
        <Col md={12} sm={12} xs={24}>
            <Card
                title={
                    <Row justify={'space-between'}>
                        <Title level={4}>Field {index + 1}</Title>
                        <Row justify={'space-around'}>
                            <Button disabled={!!first} onClick={() => onSwap(index - 1, index)}>
                                Up
                            </Button>
                            <Button disabled={!!last} onClick={() => onSwap(index, index + 1)}>
                                Down
                            </Button>
                            <Button onClick={() => onRemove(index)}>Remove</Button>
                        </Row>
                    </Row>
                }
            >
                <Row gutter={[24, 0]} align={'top'}>
                    <Col sm={12} xs={24} md={12}>
                        <CustomInput name={`${name}[${index}].key`} label="Key" />
                    </Col>
                    <Col sm={12} xs={24} md={12}>
                        <CustomInputNumber name={`${name}[${index}].width`} label="Width" />
                    </Col>
                    <Col sm={12} xs={24} md={12}>
                        <CustomRadio name={`${name}[${index}].type`} label="type" childProps={{ options: ['string', 'number', 'boolean', 'date'] }} />
                    </Col>
                </Row>
            </Card>
            <br />
            <br />
            <br />
        </Col>
    );
}

export default ColumnItem;
