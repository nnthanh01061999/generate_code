import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import TableControl from '@/components/control/table/TableFormControl';
import { Button, Form } from 'antd';
import InputControl from '@/components/control/input/InputControl';
import InputNumberControl from '@/components/control/input/InputNumberControl';

const _TableControl: Meta<typeof TableControl> = {
    title: 'Component/table/TableControl',
    component: TableControl,
    tags: ['autodocs'],
};

export default _TableControl;
type Story = StoryObj<typeof TableControl>;

export const Primary: Story = {
    name: 'TableControl',
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
        defaultValue: {
            key: '',
            width: 0,
        },
        columns: [
            {
                align: 'left',
                title: 'key',
                dataIndex: 'key',
                key: 'key',
                width: 300,
                render: (_, __, index) => <InputControl name={`name[${index}].key`} toggleError />,
            },
            {
                align: 'left',
                title: 'Width',
                dataIndex: 'width',
                key: 'width',
                width: 100,
                render: (_, __, index) => <InputNumberControl name={`name[${index}].width`} toggleError />,
            },
        ],
    },
    render: (args) => <TableControl {...args} />,
};
