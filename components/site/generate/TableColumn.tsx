import { Button, Col, Row, Space, Typography } from 'antd';
import { startCase } from 'lodash';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { tableHeaderOptions } from '@/data';
import CheckBoxControl from '@/components/control/checkbox/CheckboxControl';
import InputControl from '@/components/control/input/InputControl';
import RadioControl from '@/components/control/radio/RadioControl';
import TableColumnCard from './TableColumnCard';
const { Title } = Typography;

interface Props {
    name: string;
}

function TableColumn(props: Props) {
    const { name } = props;
    const { control } = useFormContext();
    const { fields, remove, append } = useFieldArray({
        control,
        name: 'column',
    });
    const onAdd = () => {
        append({ type: 'string' });
    };

    const onRemove = (index: number) => {
        remove(index);
    };

    return (
        <>
            <Space
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
                align="center"
            >
                <Title level={2}>{startCase(name)}</Title>
                <Button onClick={onAdd}>Add</Button>
            </Space>
            <Row gutter={[24, 24]}>
                <Col md={8} xs={12} sm={12}>
                    <RadioControl label="Header Type" name="tableHeaderType" childProps={{ options: tableHeaderOptions }} />
                </Col>
                <Col md={8} xs={12} sm={12}>
                    <CheckBoxControl label="Row Index" name="rowIndex" labelCheckBox="yes/no" />
                </Col>
                <Col md={8} xs={24} sm={24}>
                    <InputControl label="Row Interface" name="rowInterface" />
                </Col>

                {fields?.map((field, index) => (
                    <TableColumnCard key={field.id} index={index} name={'column'} onRemove={onRemove} />
                ))}
            </Row>
        </>
    );
}

export default TableColumn;
