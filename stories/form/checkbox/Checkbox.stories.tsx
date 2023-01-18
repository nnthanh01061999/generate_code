import CustomCheckbox, { CustomCheckBoxProps } from '@/components/form/CustomCheckBox';
import { yupResolver } from '@hookform/resolvers/yup';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, Story } from '@storybook/react';
import { Button, Form } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default {
    title: 'Form/Checkbox/Checkbox',
    component: CustomCheckbox,
} as ComponentMeta<typeof CustomCheckbox>;

const CusCheckbox: Story<CustomCheckBoxProps> = (args: CustomCheckBoxProps) => {
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
                <CustomCheckbox name={name} label={label} {...rest} />
                <Button htmlType="submit">Submit</Button>
            </Form>
        </FormProvider>
    );
};

export const Checkbox = CusCheckbox.bind({});
Checkbox.args = {
    name: 'name',
    label: 'label',
    onBlurCallBack: undefined,
    onChangeCallBack: undefined,
    wrapperProps: {
        required: true,
    },
    labelCheckBox: 'example',
};
