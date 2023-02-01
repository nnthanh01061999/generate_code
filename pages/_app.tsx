import ProcessBar from '@/components/shared/ProcessBar';
import ModalContextProvider from '@/context/ModalContext';
import { useDetectLocaleFormURL, usePageProcess, usePreload } from '@/utils';
import { Analytics } from '@vercel/analytics/react';
import { ConfigProvider, Layout, theme } from 'antd';
import { NextComponentType, NextPageContext } from 'next';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { ExoticComponent, Fragment, ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'antd/dist/reset.css';
import '../styles/index.scss';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import { localeArr } from '@/data';

export type CusAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ExoticComponent<{
            children?: ReactNode | undefined;
        }>;
    };
};

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: CusAppProps) {
    usePreload();

    const loadingPage = usePageProcess();
    const router = useRouter();

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
                locale={localeArr?.[router.locale as keyof typeof localeArr]?.locale}
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
