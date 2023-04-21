import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

import Tree from '@/components/control/tree/TreeControl';
import { Button, Form } from 'antd';

const _Tree: Meta<typeof Tree> = {
    title: 'Component/Tree/Tree',
    component: Tree,
    tags: ['autodocs'],
};

export default _Tree;
type Story = StoryObj<typeof Tree>;

export const Primary: Story = {
    name: 'Tree',
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
        childProps: {
            treeData: [
                {
                    title: 'parent 1',
                    key: '0-0',
                    children: [
                        {
                            title: 'parent 1-0',
                            key: '0-0-0',
                            children: [
                                {
                                    title: 'leaf',
                                    key: '0-0-0-0',
                                },
                                {
                                    title: 'leaf',
                                    key: '0-0-0-1',
                                },
                            ],
                        },
                        {
                            title: 'parent 1-1',
                            key: '0-0-1',
                            children: [
                                {
                                    title: (
                                        <span
                                            style={{
                                                color: '#1890ff',
                                            }}
                                        >
                                            sss
                                        </span>
                                    ),
                                    key: '0-0-1-0',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    render: (args) => <Tree {...args} />,
};
