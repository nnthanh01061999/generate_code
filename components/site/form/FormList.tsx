import FormItem from '@/components/site/form/FormItem';
import { Button, Row, Space, Typography } from 'antd';
import { startCase } from 'lodash';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const { Title } = Typography;

export interface IFormListProps {
    name: string;
}

function FormList(props: IFormListProps) {
    const { name } = props;
    const { control } = useFormContext();
    const { fields, remove, append, swap } = useFieldArray({
        control,
        name,
    });
    const onAdd = () => {
        append({
            key: '',
            payload: [
                {
                    key: '',
                    type: 'input',
                    xs: 24,
                    md: 12,
                },
            ],
        });
    };

    const onRemove = (index: number) => {
        remove(index);
    };

    const onSwap = (from: number, to: number) => {
        swap(from, to);
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
                {fields?.map((field, index) => (
                    <FormItem key={field.id} index={index} name={name} onRemove={onRemove} onSwap={onSwap} first={index === 0} last={index + 1 === fields.length} />
                ))}
            </Row>
        </>
    );
}

export default FormList;
