import InputControl from '@/components/control/input/InputControl';
import InputNumberControl from '@/components/control/input/InputNumberControl';
import SelectControl from '@/components/control/select/SelectControl';
import TableFormControl from '@/components/control/table/TableFormControl';
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
            align: 'left',
            title: 'key',
            dataIndex: 'key',
            key: 'key',
            width: 300,
            render: (_, __, index) => <InputControl name={`${name}[${index}].key`} toggleError />,
        },
        {
            align: 'left',
            title: 'Width',
            dataIndex: 'width',
            key: 'width',
            width: 100,
            render: (_, __, index) => <InputNumberControl name={`${name}[${index}].width`} toggleError />,
        },
        {
            align: 'left',
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 160,
            render: (_, __, index) => (
                <SelectControl
                    name={`${name}[${index}].type`}
                    childProps={{
                        options: [
                            {
                                value: 'string',
                                label: 'string',
                            },
                            {
                                value: 'number',
                                label: 'number',
                            },
                            {
                                value: 'boolean',
                                label: 'boolean',
                            },
                            {
                                value: 'date',
                                label: 'date',
                            },
                        ],
                    }}
                />
            ),
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
                scroll: { x: isMobile ? '100%' : '100%', y: 480 },
                pagination: false,
                bordered: true,
            }}
        />
    );
}

export default ActionForm;
