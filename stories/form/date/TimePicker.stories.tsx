import CustomTimePicker from '@/components/form/CustomTimePicker';
import { CommonFormProps } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, TimePickerProps, Form } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/Date/TimePicker',
    component: CustomTimePicker,
} as ComponentMeta<typeof CustomTimePicker>;

const CusTimePicker: Story<CommonFormProps<TimePickerProps>> = (args: CommonFormProps<TimePickerProps>) => {
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
                <CustomTimePicker name={name} label={label} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const TimePicker = CusTimePicker.bind({});
TimePicker.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
};
