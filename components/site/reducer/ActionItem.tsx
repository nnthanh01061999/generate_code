import InputControl from '@/components/control/input/InputControl';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import ActionPayloadList from './ActionPayloadList';

const { Title } = Typography;

export interface IActionItemProps {
    index: number;
    name: string;
    onRemove: (index: number) => void;
}

function ActionItem(props: IActionItemProps) {
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
                    <Col sm={24} xs={24} md={24}>
                        <InputControl name={`${name}[${index}].key`} label="Key" />
                    </Col>
                    <Col sm={24} xs={24} md={24}>
                        <ActionPayloadList name={`${name}[${index}].payload`} />
                    </Col>
                </Row>
            </Card>
            <br />
            <br />
            <br />
        </Col>
    );
}

export default ActionItem;
