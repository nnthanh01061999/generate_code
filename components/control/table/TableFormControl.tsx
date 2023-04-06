import CustomTable, { ICustomTableProps } from '@/components/shared/CustomTable';
import NumberFormat from '@/components/shared/NumberFormat';
import { IColumnType, ITableForwardRef } from '@/interfaces';
import { useEffectKeyboardShortcut } from '@/utils';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, PlusOutlined, DragOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Row, Space, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, { forwardRef, Fragment, Key, useEffect, useImperativeHandle, useRef } from 'react';
import { FieldValues, useFieldArray, UseFieldArrayReturn, useFormContext } from 'react-hook-form';
import ReactDragListView from 'react-drag-listview';
import { COLOR_BLUE } from '@/data';

const { Text } = Typography;

export const defaultKeys = ['ArrowDown', 'ArrowUp'];

export type ITableFormControlKeyEvent = 'ArrowDown' | 'ArrowUp';

export interface CustomMyKeyDownEvent extends globalThis.KeyboardEvent {
    target: Element;
}

export interface ITableFormControlProps {
    disabled?: boolean;
    name: string;
    label?: React.ReactNode;
    defaultValue: any;
    columns: IColumnType<any>[];
    keys?: ITableFormControlKeyEvent[];
    tableProps: ICustomTableProps;
    addable?: boolean;
    swappable?: boolean;
    indexable?: boolean;
    deletable?: boolean;
    dragable?: boolean;
    onChangeSelection?: (method: UseFieldArrayReturn<FieldValues, string, 'id'>, selectedRowKeys: Key[], seletecRows: any[]) => void;
}

function TableFormControl<T>(props: ITableFormControlProps, ref: ITableForwardRef<T>) {
    const {
        disabled,
        name,
        label,
        defaultValue = {},
        keys = defaultKeys,
        columns,
        tableProps,
        addable = true,
        swappable = true,
        indexable = true,
        deletable = true,
        dragable = true,
        onChangeSelection,
    } = props;

    const tableRef = useRef<HTMLDivElement>(null);

    const tC = useTranslations('Common');
    const tT = useTranslations('Common.table');

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const methodArray = useFieldArray({
        control,
        name,
    });

    const { fields, remove, append, swap } = methodArray;

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

    const indexColumn: IColumnType<any> = {
        fixed: 'left',
        responsive: ['sm'],
        title: tT('columns.index'),
        dataIndex: 'id',
        key: 'id',
        width: 80,
        render: (_, __, index) => <NumberFormat value={index + 1} />,
    };

    const operateColumn: IColumnType<any> = {
        responsive: ['sm'],
        title: tT('columns.operation.label'),
        key: 'operation',
        fixed: 'right',
        width: swappable ? 140 : 80,
        render: (_, __, index) => {
            return (
                <Space>
                    {swappable ? <Button size="middle" icon={<ArrowUpOutlined />} type="link" onClick={() => onUp(index)} disabled={index === 0 || disabled} /> : null}
                    {swappable ? <Button size="middle" icon={<ArrowDownOutlined />} type="link" onClick={() => onDown(index)} disabled={index === (fields || [])?.length - 1 || disabled} /> : null}
                    {deletable ? <Button size="middle" icon={<DeleteOutlined />} type="link" onClick={() => onRemove(index)} disabled={disabled} /> : null}
                    {dragable ? (
                        <a href="#" style={{ cursor: 'move', color: COLOR_BLUE }}>
                            <DragOutlined />
                        </a>
                    ) : null}
                </Space>
            );
        },
    };

    const columnsWithOperation: IColumnType<any>[] = [...(indexable ? [indexColumn] : []), ...columns, ...(deletable || swappable ? [operateColumn] : [])];

    const getNewTarget = (key: string, id: string, index: number) => {
        if (key === 'ArrowDown') {
            return id.replace(/\[(\d+)\]/, `[${index + 1}]`);
        }
        if (key === 'ArrowUp') {
            return id.replace(/\[(\d+)\]/, `[${index - 1}]`);
        }
        return '';
    };

    const onDragEnd = (startIndex: number, endIndex: number) => {
        swap(startIndex - 1, endIndex - 1);
    };

    useImperativeHandle(
        ref,
        () => ({
            getMethod: () => methodArray,
        }),

        [methodArray],
    );

    useEffectKeyboardShortcut({ new: onAdd });

    useEffect(() => {
        const ref_ = tableRef;
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
            <Row gutter={[12, 12]} align="middle" justify="space-between" style={label || addable ? { marginBottom: 8 } : {}}>
                <Text strong className="margin-right">
                    {label}
                    {` `}
                    <Text type="danger">
                        <ErrorMessage errors={errors} name={name} />
                    </Text>
                </Text>
                {addable ? (
                    <Button disabled={disabled} size="middle" icon={<PlusOutlined />} onClick={onAdd}>
                        {tC('form.add')}
                    </Button>
                ) : null}
            </Row>
            <Row gutter={[24, 12]}>
                <ReactDragListView handleSelector="a" onDragEnd={onDragEnd}>
                    <CustomTable
                        tableRef={tableRef}
                        dataSource={fields}
                        {...tableProps}
                        rowSelection={
                            tableProps?.rowSelection
                                ? {
                                      selectedRowKeys: fields?.filter((item: any) => item?.__selected)?.map((item) => item.id as Key),
                                      onChange: (selectedRowKeys: Key[], selectedRows: T[]) => {
                                          if (onChangeSelection instanceof Function) {
                                              onChangeSelection(methodArray, selectedRowKeys, selectedRows);
                                          }
                                      },
                                      ...tableProps?.rowSelection,
                                  }
                                : undefined
                        }
                        columns={columnsWithOperation}
                        rowKey={(record) => record.id}
                    />
                </ReactDragListView>
            </Row>
        </Fragment>
    );
}

export default forwardRef(TableFormControl);
