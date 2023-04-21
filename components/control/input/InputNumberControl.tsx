import { CommonFormProps } from '@/interfaces';
import { ErrorMessage } from '@hookform/error-message';
import { Form, InputNumber, InputNumberProps } from 'antd';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';

function InputNumberControl(props: CommonFormProps<InputNumberProps>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

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

    const handleOnBlur = (onBlur: () => void) => {
        return () => {
            onBlur();
            if (onBlurCallBack instanceof Function) {
                onBlurCallBack();
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
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item
                    {...wrapperProps}
                    style={toggleError ? { marginBottom: isHaveError ? 24 : 0, ...(wrapperProps?.style || {}) } : { ...(wrapperProps?.style || {}) }}
                    label={label}
                    htmlFor={name}
                    help={errorElement}
                    validateStatus={isHaveError ? 'error' : undefined}
                >
                    <InputNumber
                        className="input-number"
                        style={{ width: '100%' }}
                        formatter={(value) => `${value}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        {...childProps}
                        ref={ref}
                        id={name}
                        value={value}
                        onChange={handleOnChange(onChange)}
                        onBlur={handleOnBlur(onBlur)}
                    />
                </Form.Item>
            )}
        />
    );
}

export default InputNumberControl;
