import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import MonthPicker from '@/components/control/date-picker/MonthPickerControl';
import { Button, Form } from 'antd';

const _MonthPicker: Meta<typeof MonthPicker> = {
    title: 'Component/Date/MonthPicker',
    component: MonthPicker,
    tags: ['autodocs'],
};

export default _MonthPicker;
type Story = StoryObj<typeof MonthPicker>;

export const Primary: Story = {
    name: 'MonthPicker',
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
    render: (args) => <MonthPicker {...args} />,
};
