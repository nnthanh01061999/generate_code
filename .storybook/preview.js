import '@/styles/index.scss';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import { NextIntlProvider } from 'next-intl';
import { nextIntl } from './nextIntl';
import { queryClient } from '@/pages/_app';
import ModalContextProvider from '@/context/ModalContext';
import { QueryClientProvider } from 'react-query';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'dark',
    },
    nextIntl,
    locale: nextIntl.defaultLocale,
    locales: {
        en: 'English',
        vi: 'VietNam',
    },
};

export const decorators = [
    (Story) => (
        <NextIntlProvider locale={nextIntl.defaultLocale} messages={nextIntl.messages?.[nextIntl.defaultLocale]}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm,
                        token: { colorPrimary: 'white' },
                    }}
                >
                    <ModalContextProvider>
                        <Story />
                    </ModalContextProvider>
                </ConfigProvider>
            </QueryClientProvider>
        </NextIntlProvider>
    ),
];
