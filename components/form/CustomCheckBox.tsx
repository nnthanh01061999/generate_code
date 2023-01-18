import { ErrorMessage } from '@hookform/error-message';
import { Checkbox, Form, RadioProps, Typography } from 'antd';
import React, { ReactNode } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/interfaces/form';

const { Text } = Typography;

export interface CustomCheckBoxProps extends CommonFormProps<RadioProps> {
    labelCheckBox?: ReactNode;
}

function CustomCheckBox(props: CustomCheckBoxProps) {
    const { name, label, showError = true, childProps, wrapperProps, labelCheckBox, onChangeCallBack = undefined } = props;

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
        return showError && errors ? <Text type="danger">{<ErrorMessage errors={errors} name={name} />}</Text> : null;
    }, [showError, errors, name]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item {...wrapperProps} label={label} htmlFor={name} help={errorElement} validateStatus={isHaveError ? 'error' : undefined}>
                    <Checkbox {...childProps} ref={ref} id={name} checked={value} onChange={handleOnChange(onChange)}>
                        {labelCheckBox}
                    </Checkbox>
                </Form.Item>
            )}
        />
    );
}

export default CustomCheckBox;
