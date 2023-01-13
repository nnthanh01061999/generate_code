import ProcessBar from '@/components/shared/ProcessBar';
import { usePreload } from '@/utils';
import { ConfigProvider, Layout, theme } from 'antd';
import 'antd/dist/reset.css';
import { NextComponentType, NextPageContext } from 'next';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { ExoticComponent, Fragment, ReactNode, useMemo } from 'react';
import '../styles/index.scss';

export type CusAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ExoticComponent<{
            children?: ReactNode | undefined;
        }>;
    };
};

function MyApp({ Component, pageProps }: CusAppProps) {
    usePreload();

    const content = useMemo(() => {
        const PageLayout = Component.Layout || Fragment;

        return (
            <Layout>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </Layout>
        );
    }, [Component, pageProps]);

    return (
        <NextIntlProvider messages={pageProps.messages}>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: { colorPrimary: 'white' },
                }}
            >
                <ProcessBar />
                {content}
            </ConfigProvider>
        </NextIntlProvider>
    );
}

export default MyApp;
