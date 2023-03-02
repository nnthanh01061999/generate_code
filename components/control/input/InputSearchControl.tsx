import { ErrorMessage } from '@hookform/error-message';
import { Form, Input, InputProps, Typography } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/interfaces';

const { Text } = Typography;

function InputSearchControl(props: CommonFormProps<InputProps>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined } = props;

    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const watchValue = watch(name);

    const [temp, setTemp] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const getValue = (value: string) => {
        return (open ? temp : value) || undefined;
    };

    const handleOnChange = (e: any) => {
        setTemp(e.target.value);
    };

    const handleOnSeach = (onChange: (value: any) => void) => {
        return (value: any) => {
            onChange(value || null);
            if (onChangeCallBack && onChangeCallBack instanceof Function) {
                onChangeCallBack(value);
            }
        };
    };

    const handleOnFocus = () => {
        setOpen(true);
    };

    const isHaveError = React.useMemo(() => {
        return get(errors, name, undefined);
    }, [errors, name]);

    const errorElement = React.useMemo(() => {
        return showError && errors ? <Text type="danger">{<ErrorMessage errors={errors} name={name} />}</Text> : null;
    }, [showError, errors, name]);

    useEffect(() => {
        if (!watchValue) {
            setTemp(null);
        }
    }, [watchValue]);

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
                    <Input.Search allowClear {...childProps} id={name} ref={ref} value={getValue(value)} onChange={handleOnChange} onSearch={handleOnSeach(onChange)} onFocus={handleOnFocus} />
                </Form.Item>
            )}
        />
    );
}

export default InputSearchControl;
