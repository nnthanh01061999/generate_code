import CustomInput from '@/components/form/CustomInput';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form, InputProps } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/Input',
    component: CustomInput,
} as ComponentMeta<typeof CustomInput>;

const CusInput: Story<CommonFormProps<InputProps>> = (args: CommonFormProps<InputProps>) => {
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
                <CustomInput name={name} label={label} {...rest} />
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
