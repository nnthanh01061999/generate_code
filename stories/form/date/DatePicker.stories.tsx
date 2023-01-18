import CustomDatePicker from '@/components/form/CustomDatePicker';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, DatePickerProps, Form } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/Date/DatePicker',
    component: CustomDatePicker,
} as ComponentMeta<typeof CustomDatePicker>;

const CusDatePicker: Story<CommonFormProps<DatePickerProps>> = (args: CommonFormProps<DatePickerProps>) => {
    const { name, label, ...rest } = args;

    const schema = yup.object().shape({
        [name]: yup.date().nullable().required(),
    });

    const methods = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <FormProvider {...methods}>
            <Form onFinish={methods.handleSubmit(action('[React Hooks Form] Submit'))} layout="vertical">
                <CustomDatePicker name={name} label={label} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const DatePicker = CusDatePicker.bind({});
DatePicker.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
};
