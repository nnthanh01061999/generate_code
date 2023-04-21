import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import YearPicker from '@/components/control/date-picker/YearPickerControl';
import { Button, Form } from 'antd';

const _YearPicker: Meta<typeof YearPicker> = {
    title: 'Component/Date/YearPicker',
    component: YearPicker,
    tags: ['autodocs'],
};

export default _YearPicker;
type Story = StoryObj<typeof YearPicker>;

export const Primary: Story = {
    name: 'YearPicker',
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
    render: (args) => <YearPicker {...args} />,
};
