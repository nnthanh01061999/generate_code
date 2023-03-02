import { Locale } from 'antd/lib/locale';

export interface ICusLocale {
    key: string;
    value: string;
    label: string;
    locale: Locale;
    flag: any;
    fullkey: string;
}

export interface ILocaleObj {
    [key: string]: ICusLocale;
}
