import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import TimePicker from '@/components/control/date-picker/TimePickerControl';
import { Button, Form } from 'antd';

const _TimePicker: Meta<typeof TimePicker> = {
    title: 'Component/Date/TimePicker',
    component: TimePicker,
    tags: ['autodocs'],
};

export default _TimePicker;
type Story = StoryObj<typeof TimePicker>;

export const Primary: Story = {
    name: 'TimePicker',
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
    render: (args) => <TimePicker {...args} />,
};
