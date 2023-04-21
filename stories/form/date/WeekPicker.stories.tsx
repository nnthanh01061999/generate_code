import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import WeekPicker from '@/components/control/date-picker/WeekPickerControl';
import { Button, Form } from 'antd';

const _WeekPicker: Meta<typeof WeekPicker> = {
    title: 'Component/Date/WeekPicker',
    component: WeekPicker,
    tags: ['autodocs'],
};

export default _WeekPicker;
type Story = StoryObj<typeof WeekPicker>;

export const Primary: Story = {
    name: 'WeekPicker',
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
    render: (args) => <WeekPicker {...args} />,
};
