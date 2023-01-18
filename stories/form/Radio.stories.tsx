import CustomRadio from '@/components/form/CustomRadio';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form, RadioGroupProps } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/Radio',
    component: CustomRadio,
} as ComponentMeta<typeof CustomRadio>;

const CusRadio: Story<CommonFormProps<RadioGroupProps>> = (args: CommonFormProps<RadioGroupProps>) => {
    const { name, label, ...rest } = args;

    const schema = yup.object().shape({
        [name]: yup.mixed().required(),
    });

    const methods = useForm({
        defaultValues: { [name]: '' },
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(action('[React Hooks Form] Submit'))} layout="vertical">
                <CustomRadio name={name} label={label} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const Radio = CusRadio.bind({});
Radio.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
    childProps: {
        options: [
            { value: 'example1', label: 'example1' },
            { value: 'example2', label: 'example2' },
            { value: 'example3', label: 'example3' },
        ],
    },
};
