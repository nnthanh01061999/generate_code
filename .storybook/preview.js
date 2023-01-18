import '@/styles/index.scss';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import { NextIntlProvider } from 'next-intl';
import { nextIntl } from './nextIntl';

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
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: { colorPrimary: 'white' },
                }}
            >
                <Story />
            </ConfigProvider>
        </NextIntlProvider>
    ),
];
