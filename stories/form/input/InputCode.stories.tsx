import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import InputCode from '@/components/control/input/InputCodeControl';
import { Button, Form } from 'antd';

const _InputCode: Meta<typeof InputCode> = {
    title: 'Component/Input/InputCode',
    component: InputCode,
    tags: ['autodocs'],
};

export default _InputCode;
type Story = StoryObj<typeof InputCode>;

export const Primary: Story = {
    name: 'InputCode',
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
    },
    render: (args) => <InputCode {...args} />,
};
