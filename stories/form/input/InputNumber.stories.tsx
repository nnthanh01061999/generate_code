import CustomInputNumber from '@/components/form/CustomInputNumber';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form, InputNumberProps } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/Input/InputNumber',
    component: CustomInputNumber,
} as ComponentMeta<typeof CustomInputNumber>;

const CusInputNumber: Story<CommonFormProps<InputNumberProps>> = (args: CommonFormProps<InputNumberProps>) => {
    const { name, label, ...rest } = args;

    const schema = yup.object().shape({
        [name]: yup.number().required(),
    });

    const methods = useForm({
        defaultValues: { [name]: '' },
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(action('[React Hooks Form] Submit'))} layout="vertical">
                <CustomInputNumber name={name} label={label} wrapperProps={{ required: true }} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const InputNumber = CusInputNumber.bind({});
InputNumber.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
};
