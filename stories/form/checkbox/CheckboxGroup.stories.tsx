import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import CheckBoxGroup from '@/components/control/checkbox/CheckboxGroupControl';
import { Button, Form } from 'antd';

const _CheckBoxGroup: Meta<typeof CheckBoxGroup> = {
    title: 'Component/CheckBox/CheckBoxGroup',
    component: CheckBoxGroup,
    tags: ['autodocs'],
};

export default _CheckBoxGroup;
type Story = StoryObj<typeof CheckBoxGroup>;

export const Primary: Story = {
    name: 'CheckBoxGroup',
    decorators: [
        (Story) => {
            const methods = useForm({
                mode: 'onBlur',
            });

            return (
                <FormProvider {...methods}>
                    <Form layout="vertical" onFinish={methods.handleSubmit(action('[React Hooks Form] Submit'))}>
                        <Story />
                        <Button htmlType="submit">Submit</Button>
                    </Form>
                </FormProvider>
            );
        },
    ],
    args: {
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
    },
    render: (args) => <CheckBoxGroup {...args} />,
};
