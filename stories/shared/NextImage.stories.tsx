import NextImage, { TNextImageProps } from '@/components/shared/NextImage';
import { ComponentMeta, Story } from '@storybook/react';

export default {
    title: 'Shared/NextImage_',
    component: NextImage,
} as ComponentMeta<typeof NextImage>;

const CusNextImage: Story<TNextImageProps> = (args: TNextImageProps) => {
    return <NextImage {...args} />;
};

export const NextImage_ = CusNextImage.bind({});

NextImage_.args = {
    height: 300,
    width: 450,
    src: 'https://image-placeholder.com/images/actual-size/450x300.png',
};
