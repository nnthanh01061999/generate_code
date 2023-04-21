import { ErrorMessage } from '@hookform/error-message';
import { Checkbox, Form, RadioGroupProps, Typography } from 'antd';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/interfaces';

function CheckBoxGroupControl(props: CommonFormProps<RadioGroupProps>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value);
            if (onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
            }
        };
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <ErrorMessage errors={errors} name={name} /> : null;
    }, [showError, errors, name]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange } }) => (
                <Form.Item
                    {...wrapperProps}
                    style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
                    label={label}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <Checkbox.Group {...childProps} ref={ref} value={value} onChange={handleOnChange(onChange)} />
                </Form.Item>
            )}
        />
    );
}

export default CheckBoxGroupControl;
