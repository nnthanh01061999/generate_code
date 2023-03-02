import InputControl from '@/components/control/input/InputControl';
import InputNumberControl from '@/components/control/input/InputNumberControl';
import RadioControl from '@/components/control/radio/RadioControl';
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
        <Col md={12} sm={24} xs={24}>
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
                        <InputControl name={`${name}[${index}].key`} label="Key" />
                    </Col>
                    <Col sm={12} xs={24} md={12}>
                        <InputNumberControl name={`${name}[${index}].width`} label="Width" />
                    </Col>
                    <Col sm={12} xs={24} md={12}>
                        <RadioControl name={`${name}[${index}].type`} label="type" childProps={{ options: ['string', 'number', 'boolean', 'date'] }} />
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
