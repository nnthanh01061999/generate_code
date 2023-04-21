import MainHeader from '@/components/header/MainHeader';
import NextSEO from '@/components/shared/NextSEO';
import { Layout } from 'antd';
import { useTranslations } from 'next-intl';
import React, { Fragment, PropsWithChildren, ReactNode } from 'react';
const { Content } = Layout;
export interface ILayoutProps extends PropsWithChildren {
    seo?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}

function MainLayout(props: ILayoutProps) {
    const { seo, header, footer, children } = props;
    const t = useTranslations('Common');

    return (
        <Layout className="main-layout">
            {seo ? seo : <NextSEO />}
            {header ? header : <MainHeader />}
            <Content style={{ padding: 20, height: 'calc(100vh - 64px)', overflow: 'auto', paddingBottom: 100 }}>{children}</Content>
            {footer ? footer : null}
        </Layout>
    );
}

export default MainLayout;
