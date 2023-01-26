import ProcessBar from '@/components/shared/ProcessBar';
import ModalContextProvider from '@/context/ModalContext';
import { usePageProcess, usePreload } from '@/utils';
import { Analytics } from '@vercel/analytics/react';
import { ConfigProvider, Layout, theme } from 'antd';
import { NextComponentType, NextPageContext } from 'next';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { ExoticComponent, Fragment, ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'antd/dist/reset.css';
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
    const [queryClient] = useState(() => new QueryClient());
    const loadingPage = usePageProcess();

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
                <QueryClientProvider client={queryClient}>
                    <ModalContextProvider>
                        <ProcessBar loading={loadingPage} />
                        {content}
                        <Analytics />
                    </ModalContextProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ConfigProvider>
        </NextIntlProvider>
    );
}

export default MyApp;
