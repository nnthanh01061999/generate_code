import { ReactNode } from 'react';

export interface IOption<T> {
    value: T;
    label: ReactNode;
    [key: string | number]: any;
}
