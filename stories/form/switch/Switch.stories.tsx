import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import Switch from '@/components/control/switch/SwitchControl';
import { Button, Form } from 'antd';

const _Switch: Meta<typeof Switch> = {
    title: 'Component/Switch/Switch',
    component: Switch,
    tags: ['autodocs'],
};

export default _Switch;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
    name: 'Switch',
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
    render: (args) => <Switch {...args} />,
};
