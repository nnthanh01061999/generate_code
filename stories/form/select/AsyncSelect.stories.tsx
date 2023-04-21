import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import AsyncSelect from '@/components/control/select/AsyncSelectControl';
import { Button, Form } from 'antd';

const _AsyncSelect: Meta<typeof AsyncSelect> = {
    title: 'Component/Select/AsyncSelect',
    component: AsyncSelect,
    tags: ['autodocs'],
};

export default _AsyncSelect;
type Story = StoryObj<typeof AsyncSelect>;

export const Primary: Story = {
    name: 'AsyncSelect',
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
        onBlurCallBack: undefined,
        onChangeCallBack: undefined,
        wrapperProps: {
            required: true,
        },
        childProps: {
            config: {
                url: 'https://jsonplaceholder.typicode.com/posts',
                name: 'pet',
                valueField: 'id',
                labelField: 'title',
                responseKey: '',
            },
            axiosConfig: {
                timeout: 30000,
            },
        },
    },
    render: (args) => <AsyncSelect {...args} />,
};
