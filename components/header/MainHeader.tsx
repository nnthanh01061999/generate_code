import LocaleSwitcher from '@/components/shared/LocaleSwitcher';
import NextImage from '@/components/shared/NextImage';
import { Layout, Space, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
import Icon from '~/images/svg/logo.svg';
import NextLink from '../shared/NextLink';
const { Header } = Layout;
const { Text } = Typography;

function MainHeader() {
    const t = useTranslations('Common');

    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
            <NextLink href={'/'}>
                <Space>
                    <NextImage src={Icon} alt="main-logo" layout="responsive" width={64} height={64} />
                    <Text>{t('title')}</Text>
                </Space>
            </NextLink>
            <LocaleSwitcher />
        </Header>
    );
}

export default MainHeader;
