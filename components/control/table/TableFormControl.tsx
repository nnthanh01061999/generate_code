import DraggableRow from '@/components/control/table/DraggableRow';
import CustomTable, { ICustomTableProps } from '@/components/shared/CustomTable';
import NumberFormat from '@/components/shared/NumberFormat';
import { IColumnType, ITableForwardRef } from '@/interfaces';
import { useEffectKeyboardShortcut } from '@/utils';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Row, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, { forwardRef, Fragment, Key, useEffect, useImperativeHandle, useRef } from 'react';
import { FieldValues, useFieldArray, UseFieldArrayReturn, useFormContext } from 'react-hook-form';

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
    indexable?: boolean;
    deletable?: boolean;
    draggable?: boolean;
    onChangeSelection?: (method: UseFieldArrayReturn<FieldValues, string, 'id'>, selectedRowKeys: Key[], seletecRows: any[]) => void;
}

function TableFormControl<T>(props: ITableFormControlProps, ref: ITableForwardRef<T>) {
    const { disabled, name, label, defaultValue = {}, keys = defaultKeys, columns, tableProps, addable = true, indexable = true, deletable = true, draggable = true, onChangeSelection } = props;

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

    const { setFocus } = useFormContext();

    const indexColumn: IColumnType<any> = {
        fixed: 'left',
        title: tT('columns.index'),
        dataIndex: 'id',
        key: 'id',
        width: 80,
        render: (_, __, index) => <NumberFormat value={index + 1} />,
    };

    const operateColumn: IColumnType<any> = {
        title: tT('columns.operation.label'),
        key: 'operation',
        fixed: 'right',
        width: 60,
        render: (_, __, index) => {
            return <Button size="middle" icon={<DeleteOutlined />} type="link" onClick={() => onRemove(index)} disabled={disabled} />;
        },
    };

    const dragColumn: IColumnType<any> = {
        key: 'sort',
        fixed: 'right',
        width: 60,
    };

    const columnsWithOperation: IColumnType<any>[] = [...(indexable ? [indexColumn] : []), ...columns, ...(deletable ? [operateColumn] : []), ...(draggable ? [dragColumn] : [])];

    const getNewTarget = (key: string, id: string, index: number) => {
        if (key === 'ArrowDown') {
            return id.replace(/\[(\d+)\]/, `[${index + 1}]`);
        }
        if (key === 'ArrowUp') {
            return id.replace(/\[(\d+)\]/, `[${index - 1}]`);
        }
        return '';
    };

    const onDragStart = () => {
        const elementContent = tableRef.current?.getElementsByClassName('ant-table-content')[0] as HTMLElement;
        if (elementContent) elementContent.style.overflow = 'hidden hidden';
    };

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        const elementContent = tableRef.current?.getElementsByClassName('ant-table-content')[0] as HTMLElement;
        if (elementContent) elementContent.style.overflow = 'auto hidden';

        if (active.id && over?.id && active.id !== over.id) {
            const indexActive = fields.findIndex((item) => item.id === active.id);
            const indexOver = fields.findIndex((item) => item.id === over.id);
            swap(indexActive, indexOver);
        }
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
                <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                    <SortableContext disabled={disabled || !draggable} items={fields.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                        <CustomTable
                            tableRef={tableRef}
                            dataSource={fields}
                            {...tableProps}
                            components={
                                draggable
                                    ? {
                                          body: {
                                              row: DraggableRow,
                                          },
                                      }
                                    : undefined
                            }
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
                    </SortableContext>
                </DndContext>
            </Row>
        </Fragment>
    );
}

export default forwardRef(TableFormControl);
