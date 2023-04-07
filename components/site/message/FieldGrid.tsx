import InputControl from '@/components/control/input/InputControl';
import TableFormControl from '@/components/control/table/TableFormControl';
import NumberFormat from '@/components/shared/NumberFormat';
import { TMessageFiled, TTableFormColumnValues } from '@/interfaces';
import { useDeviceMobile } from '@/store/reducer/device/deviceHook';
import { ColumnType } from 'antd/es/table';
import React from 'react';

const defaultValue: TMessageFiled = {
    key: '',
    name: '',
};

export interface IFieldGridProps {
    name: string;
    label?: React.ReactNode;
}

function FieldGrid(props: IFieldGridProps) {
    const { name, label } = props;

    const isMobile = useDeviceMobile();

    const columns: ColumnType<TTableFormColumnValues>[] = [
        {
            align: 'left',
            title: 'key',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
            render: (_, __, index) => <InputControl name={`${name}[${index}].key`} toggleError />,
        },
        {
            align: 'left',
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            render: (_, __, index) => <InputControl name={`${name}[${index}].name`} toggleError />,
        },
    ];

    return (
        <TableFormControl
            name={name}
            label={label}
            defaultValue={defaultValue}
            columns={columns}
            tableProps={{
                className: 'main-table main-table--vertical-top',
                scroll: { x: '100%', y: 480 },
                pagination: false,
                bordered: true,
            }}
        />
    );
}

export default FieldGrid;
