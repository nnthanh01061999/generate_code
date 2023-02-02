import ProcessBar from '@/components/shared/ProcessBar';
import ModalContextProvider from '@/context/ModalContext';
import { localeArr } from '@/data';
import { applyClientState } from '@/store/client';
import { load, save, wrapper } from '@/store/store';
import { usePageProcess, usePreload } from '@/utils';
import { Analytics } from '@vercel/analytics/react';
import { ConfigProvider, Layout, theme } from 'antd';
import { NextComponentType, NextPageContext } from 'next';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ExoticComponent, Fragment, ReactNode, useEffect, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useStore } from 'react-redux';
import 'antd/dist/reset.css';
import '@/styles/index.scss';

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
    const store = useStore();
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

    useEffect(() => {
        const state = load();
        if (state) {
            applyClientState(state);
        }

        if (process.browser) {
            store.subscribe(() => {
                save(store.getState());
            });
        }
    }, [store]);

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

export default wrapper.withRedux(MyApp);
