import StateItem from '@/components/site/reducer/StateItem';
import { Button, Row, Space, Typography } from 'antd';
import { startCase } from 'lodash';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const { Title } = Typography;

export interface IStateListProps {
    name: string;
}

function StateList(props: IStateListProps) {
    const { name } = props;
    const { control } = useFormContext();
    const { fields, remove, append } = useFieldArray({
        control,
        name,
    });
    const onAdd = () => {
        append({ key: '', type: 'string' });
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
                    <StateItem key={field.id} index={index} name={name} onRemove={onRemove} />
                ))}
            </Row>
        </>
    );
}

export default StateList;
