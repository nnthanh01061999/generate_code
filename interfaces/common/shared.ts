import { Key, ReactNode } from 'react';

export interface IOption<T> {
    value: T;
    label: string | ReactNode;
    [key: string | number]: any;
}

export interface IDataSource<T> {
    items: T[];
    total: number;
    loading?: boolean;
}

export interface IMainResponse<T> {
    message: string | null;
    error_code: string | null;
    data: T;
}

export type TAction = 'create' | 'update' | 'view' | 'none' | 'search';

export type IPageState<T> = {
    action: TAction;
    id: number | string;
    data?: IDataSource<T>;
    selectedKeys?: Key[];
    selectedRows?: T[];
};

export interface IMainUpdatePayload<T> {
    id: number | string;
    payload: T;
}

export interface IMainResponseAffected {
    rows_affected: number;
}
