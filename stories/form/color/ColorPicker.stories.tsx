import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import ColorPicker from '@/components/control/color-picker/ColorPickerControl';
import { Button, Form } from 'antd';

const _ColorPicker: Meta<typeof ColorPicker> = {
    title: 'Component/ColorPicker/ColorPicker',
    component: ColorPicker,
    tags: ['autodocs'],
};

export default _ColorPicker;
type Story = StoryObj<typeof ColorPicker>;

export const Primary: Story = {
    name: 'ColorPicker',
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
    render: (args) => <ColorPicker {...args} />,
};
