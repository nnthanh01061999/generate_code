import { CommonFormProps } from '@/interfaces/form';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Typography } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AsyncSelect, { IAsyncSelectProps } from '../shared/AsyncSelect';
const { Text } = Typography;

export interface ICustomAsyncSelectProps extends CommonFormProps<IAsyncSelectProps> {
    onChangeCallBack?: (value: any, options?: any) => void;
    childProps: IAsyncSelectProps;
}

function CustomAsyncSelect(props: ICustomAsyncSelectProps) {
    const { name, label, showError = true, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any, option: any) => {
            onChange(value || null);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(value, option);
            }
        };
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <Text type="danger">{<ErrorMessage errors={errors} name={name} />}</Text> : null;
    }, [showError, errors, name]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item {...wrapperProps} label={label} htmlFor={name} help={errorElement} validateStatus={isHaveError ? 'error' : undefined}>
                    <AsyncSelect {...childProps} ref={ref} id={name} value={value} onChange={handleOnChange(onChange)} />
                </Form.Item>
            )}
        />
    );
}

export default CustomAsyncSelect;
