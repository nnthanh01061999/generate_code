import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import Select from '@/components/control/select/SelectControl';
import { Button, Form } from 'antd';

const _Select: Meta<typeof Select> = {
    title: 'Component/Select/Select',
    component: Select,
    tags: ['autodocs'],
};

export default _Select;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
    name: 'Select',
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
        childProps: {
            options: [{ value: 'example', label: 'example' }],
        },
    },
    render: (args) => <Select {...args} />,
};
