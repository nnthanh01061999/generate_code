import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import InputPassword from '@/components/control/input/InputPasswordControl';
import { Button, Form } from 'antd';

const _InputPassword: Meta<typeof InputPassword> = {
    title: 'Component/Input/InputPassword',
    component: InputPassword,
    tags: ['autodocs'],
};

export default _InputPassword;
type Story = StoryObj<typeof InputPassword>;

export const Primary: Story = {
    name: 'InputPassword',
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
    render: (args) => <InputPassword {...args} />,
};
