import { ReactNode } from 'react';

export interface IOption<T> {
    value: T;
    label: string | ReactNode;
    [key: string | number]: any;
}

export interface IDataSource<T> {
    data: T[];
    total: number;
}
