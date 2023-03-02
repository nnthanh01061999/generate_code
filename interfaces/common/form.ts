import { FormItemProps } from 'antd';
import { ReactNode } from 'react';

export interface CommonFormProps<T> {
    name: string;
    label?: ReactNode;
    showError?: boolean;
    toggleError?: boolean;
    className?: string;
    wrapperProps?: FormItemProps;
    childProps?: T;
    onChangeCallBack?: (value: any) => void;
    onBlurCallBack?: () => void;
}
