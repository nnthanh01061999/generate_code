import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import Radio from '@/components/control/radio/RadioControl';
import { Button, Form } from 'antd';

const _Radio: Meta<typeof Radio> = {
    title: 'Component/Radio/Radio',
    component: Radio,
    tags: ['autodocs'],
};

export default _Radio;
type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
    name: 'Radio',
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
    render: (args) => <Radio {...args} />,
};
