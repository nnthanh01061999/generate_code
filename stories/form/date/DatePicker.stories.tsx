import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import DatePicker from '@/components/control/date-picker/DatePickerControl';
import { Button, Form } from 'antd';

const _DatePicker: Meta<typeof DatePicker> = {
    title: 'Component/Date/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
};

export default _DatePicker;
type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
    name: 'DatePicker',
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
    render: (args) => <DatePicker {...args} />,
};
