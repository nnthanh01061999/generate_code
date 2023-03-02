import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { dataTypeOptions } from '@/data';
import CheckBoxControl from '@/components/control/checkbox/CheckboxControl';
import InputControl from '@/components/control/input/InputControl';
import InputNumberControl from '@/components/control/input/InputNumberControl';
import RadioControl from '@/components/control/radio/RadioControl';
const { Title } = Typography;

interface Props {
    index: number;
    name: string;
    onRemove: (index: number) => void;
}

function TableColumnCard(props: Props) {
    const { index, name, onRemove } = props;
    const { watch } = useFormContext();
    const watchHeaderType = watch('tableHeaderType');
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
                        <Title level={4}>Column {index + 1}</Title>
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
                        <InputNumberControl name={`${name}[${index}].width`} label="Width" />
                    </Col>
                    <Col sm={24} xs={24} md={18}>
                        <RadioControl
                            name={`${name}[${index}].type`}
                            label="Type"
                            childProps={{
                                options: dataTypeOptions,
                            }}
                        />
                    </Col>
                    {watchHeaderType === 'filter' ? (
                        <Col sm={24} xs={24} md={6}>
                            <CheckBoxControl name={`${name}[${index}].search`} label="Search" labelCheckBox="Search" />
                        </Col>
                    ) : null}
                </Row>
            </Card>
        </Col>
    );
}

export default TableColumnCard;
