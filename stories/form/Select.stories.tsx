import CustomSelect from '@/components/form/CustomSelect';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form, SelectProps } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/Select',
    component: CustomSelect,
} as ComponentMeta<typeof CustomSelect>;

const CusSelect: Story<CommonFormProps<SelectProps>> = (args: CommonFormProps<SelectProps>) => {
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
                <CustomSelect name={name} label={label} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const Select = CusSelect.bind({});
Select.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
    childProps: {
        options: [{ value: 'example', label: 'example' }],
    },
};
