import ProcessBar, { IProcessBarProps } from '@/components/shared/ProcessBar';
import { ComponentMeta, Story } from '@storybook/react';

export default {
    title: 'Shared/ProcessBar_',
    component: ProcessBar,
} as ComponentMeta<typeof ProcessBar>;

const CusProcessBar: Story<IProcessBarProps> = (args: IProcessBarProps) => {
    const { loading } = args;

    return <ProcessBar loading={loading} />;
};

export const ProcessBar_ = CusProcessBar.bind({});

ProcessBar_.args = {
    loading: true,
};
