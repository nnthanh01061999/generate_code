import CheckBoxControl from '@/components/control/checkbox/CheckboxControl';
import InputControl from '@/components/control/input/InputControl';
import InputNumberControl from '@/components/control/input/InputNumberControl';
import RadioControl from '@/components/control/radio/RadioControl';
import SelectControl from '@/components/control/select/SelectControl';
import TableFormControl from '@/components/control/table/TableFormControl';
import NumberFormat from '@/components/shared/NumberFormat';
import { FORM_TYPES } from '@/data';
import { TFormFormFormValues, TTableFormColumnValues } from '@/interfaces';
import { useDeviceMobile } from '@/store/reducer/device/deviceHook';
import { ColumnType } from 'antd/es/table';
import React from 'react';

const defaultValue: TFormFormFormValues = {
    key: '',
    type: 'input',
    xs: 24,
    sm: 24,
    md: 12,
    required: false,
};

export interface IFormGridProps {
    name: string;
    label?: React.ReactNode;
}

function FormGrid(props: IFormGridProps) {
    const { name, label } = props;

    const isMobile = useDeviceMobile();

    const columns: ColumnType<TTableFormColumnValues>[] = [
        {
            responsive: ['sm'],
            align: 'left',
            title: 'key',
            dataIndex: 'key',
            key: 'key',
            fixed: 'left',
            width: 240,
            render: (_, __, index) => <InputControl name={`${name}[${index}].key`} toggleError />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 160,
            render: (_, __, index) => <SelectControl name={`${name}[${index}].type`} childProps={{ options: FORM_TYPES }} />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'default',
            dataIndex: 'defaultValue',
            key: 'defaultValue',
            width: 160,
            render: (_, __, index) => <CheckBoxControl name={`${name}[${index}].defaultValue`} />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'required',
            dataIndex: 'required',
            key: 'required',
            width: 160,
            render: (_, __, index) => <CheckBoxControl name={`${name}[${index}].required`} />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'xs',
            dataIndex: 'xs',
            key: 'xs',
            width: 160,
            render: (_, __, index) => <InputNumberControl name={`${name}[${index}].xs`} toggleError />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'sm',
            dataIndex: 'sm',
            key: 'sm',
            width: 160,
            render: (_, __, index) => <InputNumberControl name={`${name}[${index}].sm`} toggleError />,
        },
        {
            responsive: ['sm'],
            align: 'left',
            title: 'md',
            dataIndex: 'md',
            key: 'md',
            width: 160,
            render: (_, __, index) => <InputNumberControl name={`${name}[${index}].md`} toggleError />,
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

export default FormGrid;
