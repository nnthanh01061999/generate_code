import ActionItem from '@/components/site/reducer/ActionItem';
import { Button, Row, Space, Typography } from 'antd';
import { startCase } from 'lodash';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const { Title } = Typography;

export interface IActionListProps {
    name: string;
}

function ActionList(props: IActionListProps) {
    const { name } = props;
    const { control } = useFormContext();
    const { fields, remove, append } = useFieldArray({
        control,
        name,
    });
    const onAdd = () => {
        append({
            key: '',
            payload: [
                {
                    key: '',
                    type: 'string',
                },
            ],
        });
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
                {fields?.map((field, index) => (
                    <ActionItem key={field.id} index={index} name={name} onRemove={onRemove} />
                ))}
            </Row>
        </>
    );
}

export default ActionList;
