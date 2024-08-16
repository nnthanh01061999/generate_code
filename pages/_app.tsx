import ProcessBar from '@/components/shared/ProcessBar';
import ModalContextProvider from '@/context/ModalContext';
import { locales, MOBILE_WIDTH } from '@/data';
import { useApplyClientState } from '@/store/client';
import { load, save, wrapper } from '@/store/store';
import { Analytics } from '@vercel/analytics/react';
import { updateHeadersForLocale, useModalHandle, usePageProcess, usePreload } from '@/utils';
import { ConfigProvider, Layout, theme } from 'antd';
import { NextComponentType, NextPageContext } from 'next';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ExoticComponent, Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useStore } from 'react-redux';
import { useDeviceChangeMobile } from '@/store/reducer/device/deviceHook';
import 'antd/dist/reset.css';
import '@/styles/index.scss';
import { applyStorageState } from '@/store/cache';

export type CusAppProps = AppProps & {
    Component: NextComponentType<NextPageContext, any> & {
        Layout: ExoticComponent<{
            children?: ReactNode | undefined;
        }>;
    };
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 0,
        },
    },
});

function MyApp({ Component, pageProps }: CusAppProps) {
    const store = useStore();
    const applyClientState = useApplyClientState();

    const router = useRouter();

    const locale = router.locale;
    const { closeAllModal } = useModalHandle();

    const loadingPage = usePageProcess();

    const [loading] = useState(() => false);

    usePreload(loading);

    useEffect(() => {
        if (locale) {
            const localeKey = locales?.[locale]?.fullkey;
            updateHeadersForLocale(localeKey);
            queryClient.refetchQueries({ inactive: false });
        }
    }, [locale]);

    //CACHE STORE
    useEffect(() => {
        const state = load();
        if (state) {
            applyClientState(state);
            applyStorageState(state);
        }

        if (process.browser) {
            store.subscribe(() => {
                save(store.getState());
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store]);

    //DETECT PROVICE
    const mobileChange = useDeviceChangeMobile();

    useEffect(() => {
        const handleWindowResize = () => {
            const isMobile = window.innerWidth <= MOBILE_WIDTH;
            mobileChange(isMobile);
        };
        //Resize event
        if (typeof window !== 'undefined') {
            handleWindowResize();
            window.addEventListener('resize', handleWindowResize);
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        }
        return () => {
            //Clear all Modal
            closeAllModal();
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const content = useMemo(() => {
        const PageLayout = Component.Layout || Fragment;
        return (
            <Layout>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </Layout>
        );
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Component, pageProps, loading]);

    return (
        <NextIntlProvider messages={pageProps.messages}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider locale={locales?.[router.locale as keyof typeof locales]?.locale} theme={{ algorithm: theme.darkAlgorithm }}>
                    <ModalContextProvider>
                        <ProcessBar loading={loadingPage} />
                        {content}
                        <Analytics />
                    </ModalContextProvider>
                </ConfigProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </NextIntlProvider>
    );
}

export default wrapper.withRedux(MyApp);
