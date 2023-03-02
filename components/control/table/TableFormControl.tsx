import CustomTable, { ICustomTableProps } from '@/components/shared/CustomTable';
import { useEffectKeyboardShortcut } from '@/utils';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Row, Space, Typography } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import React, { Fragment, useEffect, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const { Text } = Typography;

export const defaultKeys = ['ArrowDown', 'ArrowUp'];

export type ITableFormControlKeyEvent = 'ArrowDown' | 'ArrowUp';

export interface CustomMyKeyDownEvent extends globalThis.KeyboardEvent {
    target: Element;
}

export interface ITableFormControlProps {
    name: string;
    label?: React.ReactNode;
    defaultValue: any;
    columns: ColumnType<any>[];
    keys?: ITableFormControlKeyEvent[];
    tableProps: ICustomTableProps;
}

function TableFormControl(props: ITableFormControlProps) {
    const { name, label, defaultValue = {}, keys = defaultKeys, columns, tableProps } = props;

    const ref = useRef<HTMLDivElement>(null);

    const tC = useTranslations('Common');
    const tT = useTranslations('Common.table');

    const { control } = useFormContext();

    const { fields, remove, append, swap } = useFieldArray({
        control,
        name,
    });

    const onAdd = () => {
        append(defaultValue);
    };

    const onRemove = (index: number) => {
        remove(index);
    };

    const onUp = (index: number) => {
        swap(index, index - 1);
    };

    const onDown = (index: number) => {
        swap(index, index + 1);
    };

    const { setFocus } = useFormContext();

    const columnsWithOperation: ColumnType<any>[] = [
        ...columns,
        {
            responsive: ['sm'],
            title: tT('columns.operation.label'),
            key: 'operation',
            fixed: 'right',
            width: 140,
            render: (_, __, index) => {
                return (
                    <Space>
                        <Button icon={<ArrowUpOutlined />} type="link" onClick={() => onUp(index)} disabled={index === 0} />
                        <Button icon={<ArrowDownOutlined />} type="link" onClick={() => onDown(index)} disabled={index === (fields || [])?.length - 1} />
                        <Button icon={<DeleteOutlined />} type="link" onClick={() => onRemove(index)} />
                    </Space>
                );
            },
        },
    ];

    const getNewTarget = (key: string, id: string, index: number) => {
        if (key === 'ArrowDown') {
            return id.replace(/\[(\d+)\]/, `[${index + 1}]`);
        }
        if (key === 'ArrowUp') {
            return id.replace(/\[(\d+)\]/, `[${index - 1}]`);
        }
        return '';
    };

    useEffectKeyboardShortcut({ new: onAdd });

    useEffect(() => {
        const ref_ = ref;
        const handleKeyPress = (event: globalThis.KeyboardEvent) => {
            const a = event as CustomMyKeyDownEvent;
            if (a && keys.includes(event.key)) {
                a.preventDefault();
                const id = a.target.id;
                const match = id.match(/\[(\d+)\]/);

                const index = parseFloat(match ? match[1] : '0');
                const target = getNewTarget(event.key, id, index);

                setFocus(target);
            }
        };
        if (ref_.current) {
            ref_.current.addEventListener('keydown', handleKeyPress);
        }

        return () => {
            if (ref_.current) {
                ref_.current.removeEventListener('keydown', handleKeyPress);
            }
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keys]);

    return (
        <Fragment>
            <Row align="middle" justify="space-between">
                <Text strong className="margin-right">
                    {label}
                </Text>
                <Button icon={<PlusOutlined />} onClick={onAdd}>
                    {tC('form.add')}
                </Button>
            </Row>
            <br />
            <Row gutter={[24, 12]}>
                <CustomTable tableRef={ref} dataSource={fields} {...tableProps} columns={columnsWithOperation} rowKey={(record) => record.id} />
            </Row>
        </Fragment>
    );
}

export default TableFormControl;
