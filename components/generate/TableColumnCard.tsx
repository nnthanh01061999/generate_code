import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { dataTypeOptions } from '@/data';
import CustomCheckBox from '../form/CustomCheckBox';
import CustomInput from '../form/CustomInput';
import CustomInputNumber from '../form/CustomInputNumber';
import CustomRadio from '../form/CustomRadio';
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
                    <Col span={8}>
                        <CustomInput name={`${name}[${index}].key`} label="Key" />
                    </Col>
                    <Col span={8}>
                        <CustomInput name={`${name}[${index}].title`} label="Title" />
                    </Col>
                    <Col span={8}>
                        <CustomInputNumber name={`${name}[${index}].width`} label="Width" />
                    </Col>
                    <Col span={18}>
                        <CustomRadio
                            name={`${name}[${index}].type`}
                            label="Type"
                            childProps={{
                                options: dataTypeOptions,
                            }}
                        />
                    </Col>
                    {watchHeaderType === 'filter' ? (
                        <Col span={6}>
                            <CustomCheckBox name={`${name}[${index}].search`} label="Search" labelCheckBox="Search" />
                        </Col>
                    ) : null}
                </Row>
            </Card>
        </Col>
    );
}

export default TableColumnCard;
