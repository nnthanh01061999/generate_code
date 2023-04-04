import { IColumnType, Modify } from '@/interfaces';
import { ColumnType } from 'antd/es/table';
import { ForwardedRef } from 'react';
import { FieldValues, UseFieldArrayReturn } from 'react-hook-form';

export interface IExportEnum {
    value: number | string;
    label: string;
}

export interface IExportBaseField {
    name: string;
    header: string;
}

export interface IExportExtendField {
    true_label?: string;
    false_label?: string;
    enums?: IExportEnum[];
}

export type IExportExtendFieldPrefix = {
    __extend?: IExportExtendField;
    __exportable?: boolean;
    __selected?: boolean;
};

export type IExportField = IExportBaseField & IExportExtendField;

export interface IExportPayload {
    type: number;
    sheet_name: string;
    fields: IExportField[];
}

export type IExportFormValues<T, C> = Modify<T, { time: any; fields: IColumnType<C>[] }>;

export type IExportParams<T> = Modify<T, { from_date?: string; to_date?: string }>;

export interface IImperativeHandleTable<T> {
    getColumns?: () => (ColumnType<T> & IExportExtendFieldPrefix)[];
    getMethod?: () => UseFieldArrayReturn<FieldValues, string, 'id'>;
}

export type ITableForwardRef<T> = ForwardedRef<IImperativeHandleTable<T>>;
