import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import Input from '@/components/control/input/InputControl';
import { Button, Form } from 'antd';

const _Input: Meta<typeof Input> = {
    title: 'Component/input/Input',
    component: Input,
    tags: ['autodocs'],
};

export default _Input;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    name: 'Input',
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
        name: 'test',
        label: 'Example',
        wrapperProps: {
            required: true,
        },
        childProps: {},
    },
    render: (args) => <Input {...args} />,
};
