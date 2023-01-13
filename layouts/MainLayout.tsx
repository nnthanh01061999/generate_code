import MainHeader from '@/components/header/MainHeader';
import NextSEO from '@/components/shared/NextSEO';
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren, ReactNode } from 'react';

export interface ILayoutProps extends PropsWithChildren {
    seo?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}

function MainLayout(props: ILayoutProps) {
    const { seo, header, footer, children } = props;
    const t = useTranslations('Common');

    return (
        <>
            {seo ? seo : <NextSEO />}
            {header ? header : <MainHeader />}

            {children}
            {footer ? footer : null}
        </>
    );
}

export default MainLayout;
