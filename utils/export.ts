import { DATE_FORMAT_UTC_ISO } from '@/data';
import { IExportExtendField, IExportField, IExportFormValues, IExportPayload } from '@/interfaces';
import dayjs from 'dayjs';

export interface GetPayloadExtendField {
    [key: string]: IExportExtendField;
}

export const getParamsExport = <T, C, R>(data: IExportFormValues<T, C>, getBasePayload: (data: IExportFormValues<T, C>) => R) => {
    const basePayload = getBasePayload(data);
    const extendPayload = {
        start_date: data.time ? dayjs(data.time?.[0]).utc().format(DATE_FORMAT_UTC_ISO) : undefined,
        end_date: data.time ? dayjs(data.time?.[1]).utc().format(DATE_FORMAT_UTC_ISO) : undefined,
    };
    return { ...basePayload, ...extendPayload };
};

export function getFiledExportFileds<T, C>(data: IExportFormValues<T, C>): IExportField[] {
    return data.fields
        ?.filter((column) => column.__exportable && column.__selected)
        ?.map((column) => ({
            name: column.key ? (column.key as string) : '',
            header: column.title ? (column.title as string) : '',
            ...column?.__extend,
        }));
}

export function getFiledExportPayload<T, C>(data: IExportFormValues<T, C>, sheet_name: string, type: number = 0): IExportPayload {
    const fields = getFiledExportFileds(data);
    return {
        type,
        sheet_name,
        fields,
    };
}
