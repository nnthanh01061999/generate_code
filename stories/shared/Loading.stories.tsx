import Loading from '@/components/shared/Loading';
import { ComponentMeta, Story } from '@storybook/react';

export default {
    title: 'Shared/Loading_',
    component: Loading,
} as ComponentMeta<typeof Loading>;

export const Loading_: Story<null> = () => {
    return <Loading />;
};
