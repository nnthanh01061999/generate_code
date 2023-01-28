import CustomAsyncSelect, { ICustomAsyncSelectProps } from '@/components/form/CustomAsyncSelect';
import { queryClient } from '@/pages/_app';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClientProvider } from 'react-query';
import * as yup from 'yup';

export default {
    title: 'Form/Select/AsyncSelect',
    component: CustomAsyncSelect,
} as ComponentMeta<typeof CustomAsyncSelect>;

const CusAsyncSelect: Story<ICustomAsyncSelectProps> = (args: ICustomAsyncSelectProps) => {
    const { name, label, ...rest } = args;

    const schema = yup.object().shape({
        [name]: yup.mixed().required(),
    });

    const methods = useForm({
        defaultValues: { [name]: '' },
        resolver: yupResolver(schema),
    });

    return (
        <QueryClientProvider client={queryClient}>
            <FormProvider {...methods}>
                <Form onFinish={methods.handleSubmit(action('[React Hooks Form] Submit'))} layout="vertical">
                    <CustomAsyncSelect name={name} label={label} {...rest} />
                    <Button htmlType="submit">Submit</Button>
                </Form>
            </FormProvider>
        </QueryClientProvider>
    );
};

export const AsyncSelect = CusAsyncSelect.bind({});

AsyncSelect.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
    childProps: {
        config: {
            url: 'https://jsonplaceholder.typicode.com/posts',
            name: 'pet',
            valueField: 'id',
            labelField: 'title',
            responseKey: '',
        },
    },
};

AsyncSelect.parameters = {
    docs: {
        source: {
            code: `
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
            onChange(value);
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
`,
            language: 'yml',
            type: 'auto',
            format: true,
        },
    },
};
