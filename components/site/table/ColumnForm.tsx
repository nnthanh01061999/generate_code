import InputControl from '@/components/control/input/InputControl';
import InputNumberControl from '@/components/control/input/InputNumberControl';
import RadioControl from '@/components/control/radio/RadioControl';
import TableFormControl from '@/components/control/table/TableFormControl';
import NumberFormat from '@/components/shared/NumberFormat';
import { TTableFormColumnValues } from '@/interfaces';
import { useDeviceMobile } from '@/store/reducer/device/deviceHook';
import { ColumnType } from 'antd/es/table';
import React from 'react';

const defaultValue = {
    key: '',
    payload: [
        {
            key: '',
            type: 'string',
        },
    ],
};

export interface IActionFormProps {
    name: string;
    label?: React.ReactNode;
}

function ActionForm(props: IActionFormProps) {
    const { name, label } = props;

    const isMobile = useDeviceMobile();

    const columns: ColumnType<TTableFormColumnValues>[] = [
        {
            responsive: ['sm'],
            align: 'center',
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (_, __, index) => <NumberFormat value={index + 1} />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'key',
            dataIndex: 'key',
            key: 'key',
            width: 200,
            render: (_, __, index) => <InputControl name={`${name}[${index}].key`} toggleError />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'Width',
            dataIndex: 'width',
            key: 'width',
            width: 200,
            render: (_, __, index) => <InputNumberControl name={`${name}[${index}].width`} toggleError />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'Type',
            dataIndex: 'type',
            key: 'type',

            render: (_, __, index) => <RadioControl name={`${name}[${index}].type`} label="type" childProps={{ options: ['string', 'number', 'boolean', 'date'] }} />,
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
                scroll: { x: isMobile ? '100%' : 1000, y: 480 },
                pagination: false,
                bordered: true,
            }}
        />
    );
}

export default ActionForm;
