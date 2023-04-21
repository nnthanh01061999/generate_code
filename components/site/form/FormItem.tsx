import InputControl from '@/components/control/input/InputControl';
import InputNumberControl from '@/components/control/input/InputNumberControl';
import RadioControl from '@/components/control/radio/RadioControl';
import { FORM_TYPES } from '@/data';
import { Button, Card, Col, Row, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export interface IFormItemProps {
    index: number;
    name: string;
    first: boolean;
    last: boolean;
    onRemove: (index: number) => void;
    onSwap: (from: number, to: number) => void;
}

function FormItem(props: IFormItemProps) {
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
                    <Col sm={24} xs={24} md={24}>
                        <InputControl name={`${name}[${index}].key`} label="Key" />
                    </Col>

                    <Col sm={24} xs={24} md={24}>
                        <InputNumberControl name={`${name}[${index}].sm`} label="sm" />
                    </Col>
                    <Col sm={24} xs={24} md={24}>
                        <InputNumberControl name={`${name}[${index}].md`} label="md" />
                    </Col>
                    <Col sm={24} xs={24} md={24}>
                        <RadioControl name={`${name}[${index}].type`} label="type" childProps={{ options: FORM_TYPES }} />
                    </Col>
                </Row>
            </Card>
            <br />
            <br />
            <br />
        </Col>
    );
}

export default FormItem;
