import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import InputTextArea from '@/components/control/input/InputTextAreaControl';
import { Button, Form } from 'antd';

const _InputTextArea: Meta<typeof InputTextArea> = {
    title: 'Component/Input/InputTextArea',
    component: InputTextArea,
    tags: ['autodocs'],
};

export default _InputTextArea;
type Story = StoryObj<typeof InputTextArea>;

export const Primary: Story = {
    name: 'InputTextArea',
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
    render: (args) => <InputTextArea {...args} />,
};
