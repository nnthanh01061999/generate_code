import InputCodeControl from '@/components/control/input/InputCodeControl';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form, InputProps } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/input/Input',
    component: InputCodeControl,
} as ComponentMeta<typeof InputCodeControl>;

const CusInput: Story<CommonFormProps<InputProps & { regex?: RegExp }>> = (args: CommonFormProps<InputProps & { regex?: RegExp }>) => {
    const { name, label, ...rest } = args;

    const schema = yup.object().shape({
        [name]: yup.string().required(),
    });

    const methods = useForm({
        defaultValues: { [name]: '' },
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(action('[React Hooks Form] Submit'))} layout="vertical">
                <InputCodeControl name={name} label={label} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const Input = CusInput.bind({});
Input.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
};
Input.parameters = {
    docs: {
        source: {
            code: `
import { CommonFormProps } from '@/interfaces';
import { ErrorMessage } from '@hookform/error-message';
import { Form, Input, InputProps } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function InputCodeControl(props: CommonFormProps<InputProps & { regex?: RegExp }>) {
    const { name, label, showError = true, toggleError = false, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

    const regex = childProps?.regex ?? /[^a-zA-Z0-9-_]/gi;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const handleOnChange = (onChange: (value: any) => void) => {
        return (e: any) => {
            const value = e.target.value;
            const validValue = value?.replace(regex, '');

            onChange(validValue || null);
            if (onChangeCallBack && onChangeCallBack instanceof Function) {
                onChangeCallBack(validValue);
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
        return showError && isHaveError ? <ErrorMessage errors={errors} name={name} /> : undefined;
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

export default InputCodeControl;
`,
            language: 'yml',
            type: 'auto',
            format: true,
        },
    },
};
