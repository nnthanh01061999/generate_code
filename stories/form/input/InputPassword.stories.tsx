import InputPasswordControl from '@/components/control/input/InputPasswordControl';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form, InputProps } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/input/Input/input/InputPassword',
    component: InputPasswordControl,
} as ComponentMeta<typeof InputPasswordControl>;

const CusInputPassword: Story<CommonFormProps<InputProps>> = (args: CommonFormProps<InputProps>) => {
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
                <InputPasswordControl name={name} label={label} wrapperProps={{ required: true }} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const InputPassword = CusInputPassword.bind({});
InputPassword.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
};
InputPassword.parameters = {
    docs: {
        source: {
            code: `
import { ErrorMessage } from '@hookform/error-message';
import { Form, Input, InputProps, Typography } from 'antd';
import React from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { CommonFormProps } from '@/interfaces/form';

const { Text } = Typography;

function CustomInputPasswordControl(props: CommonFormProps<InputProps>) {
    const { name, label, showError = true, childProps, wrapperProps, onChangeCallBack = undefined, onBlurCallBack = undefined } = props;

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
        return showError && errors ? <Text type="danger">{<ErrorMessage errors={errors} name={name} />}</Text> : null;
    }, [showError, errors, name]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur } }) => (
                <Form.Item {...wrapperProps} label={label} htmlFor={name} help={errorElement} validateStatus={isHaveError ? 'error' : undefined}>
                    <Input.Password {...childProps} ref={ref} id={name} value={value} onChange={handleOnChange(onChange)} onBlur={handleOnBlur(onBlur)} />
                </Form.Item>
            )}
        />
    );
}

export default CustomInputPasswordControl;
`,
            language: 'yml',
            type: 'auto',
            format: true,
        },
    },
};
