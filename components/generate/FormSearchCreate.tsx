import { Button, Row, Space, Typography } from 'antd';
import { startCase } from 'lodash';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormSearchCreateCard from './FormSearchCreateCard';
const { Title } = Typography;

interface Props {
    name: string;
}

function FormSearchCreate(props: Props) {
    const { name } = props;
    const { control } = useFormContext();
    const { fields, remove, append } = useFieldArray({
        control,
        name,
    });
    const onAdd = () => {
        append({ type: 'input', interface: 'string' });
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
                    <FormSearchCreateCard key={field.id} index={index} name={name} onRemove={onRemove} />
                ))}
            </Row>
        </>
    );
}

export default FormSearchCreate;
