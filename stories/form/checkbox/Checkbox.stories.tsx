import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import CheckBox from '@/components/control/checkbox/CheckboxControl';
import { Button, Form } from 'antd';

const _CheckBox: Meta<typeof CheckBox> = {
    title: 'Component/CheckBox/CheckBox',
    component: CheckBox,
    tags: ['autodocs'],
};

export default _CheckBox;
type Story = StoryObj<typeof CheckBox>;

export const Primary: Story = {
    name: 'CheckBox',
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
        wrapperProps: {
            required: true,
        },
        labelCheckBox: 'example',
    },
    render: (args) => <CheckBox {...args} />,
};
