import { ErrorMessage } from '@hookform/error-message';
import { Form, Input, InputProps, Typography } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/interfaces';

const { Text } = Typography;

function InputControl(props: CommonFormProps<InputProps>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value || null);
            if (onChangeCallBack && onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
            }
        };
    };

    const handleOnBlur = (onBlur: () => void) => {
        return () => {
            onBlur();
            if (onBlurCallBack && onBlurCallBack instanceof Function) {
                onBlurCallBack();
            }
        };
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && isHaveError ? <Text type="danger">{<ErrorMessage errors={errors} name={name} />}</Text> : undefined;
    }, [showError, errors, name, isHaveError]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item
                    {...wrapperProps}
                    style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
                    label={label}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <Input allowClear {...childProps} id={name} ref={ref} value={value} onChange={handleOnChange(onChange)} onBlur={handleOnBlur(onBlur)} />
                </Form.Item>
            )}
        />
    );
}

export default InputControl;
