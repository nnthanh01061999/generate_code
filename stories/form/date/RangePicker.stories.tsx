import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import RangePicker from '@/components/control/date-picker/RangePickerControl';
import { Button, Form } from 'antd';

const _RangePicker: Meta<typeof RangePicker> = {
    title: 'Component/Date/RangePicker',
    component: RangePicker,
    tags: ['autodocs'],
};

export default _RangePicker;
type Story = StoryObj<typeof RangePicker>;

export const Primary: Story = {
    name: 'RangePicker',
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
    render: (args) => <RangePicker {...args} />,
};
