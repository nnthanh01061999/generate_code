import CustomInputTextArea from '@/components/form/CustomInputTextArea';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/Input/InputTextArea',
    component: CustomInputTextArea,
} as ComponentMeta<typeof CustomInputTextArea>;

const CusInputTextArea: Story<CommonFormProps<TextAreaProps>> = (args: CommonFormProps<TextAreaProps>) => {
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
                <CustomInputTextArea name={name} label={label} wrapperProps={{ required: true }} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const InputTextArea = CusInputTextArea.bind({});
InputTextArea.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
};
