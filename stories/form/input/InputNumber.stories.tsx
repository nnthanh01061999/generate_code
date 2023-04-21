import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import InputNumber from '@/components/control/input/InputNumberControl';
import { Button, Form } from 'antd';

const _InputNumber: Meta<typeof InputNumber> = {
    title: 'Component/Input/InputNumber',
    component: InputNumber,
    tags: ['autodocs'],
};

export default _InputNumber;
type Story = StoryObj<typeof InputNumber>;

export const Primary: Story = {
    name: 'InputNumber',
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
    render: (args) => <InputNumber {...args} />,
};
