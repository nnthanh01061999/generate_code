import 'antd/dist/reset.css';
import '../styles/index.scss';
import type { AppProps } from 'next/app';
import { ConfigProvider, Layout, theme } from 'antd';
import { NextIntlProvider } from 'next-intl';
import ProcessBar from '@/components/shared/ProcessBar';

function MyApp({ Component, pageProps }: AppProps) {
    console.log('🚀 >>> pageProps', pageProps);
    return (
        <NextIntlProvider messages={pageProps.messages}>
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: { colorPrimary: 'white' },
                }}
            >
                <Layout>
                    <ProcessBar />
                    <Component {...pageProps} />
                </Layout>
            </ConfigProvider>
        </NextIntlProvider>
    );
}

export default MyApp;
