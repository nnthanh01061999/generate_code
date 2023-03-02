import { ILocaleObj } from '@/interfaces';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import vnFlag from '~/images/svg/vn-flag.svg';
import usFlag from '~/images/svg/us-flag.svg';

export const locales: ILocaleObj = {
    en: {
        key: 'en',
        value: 'en',
        label: 'English',
        locale: enUS,
        flag: usFlag,
        fullkey: 'en',
    },
    vi: {
        key: 'vi',
        value: 'vi',
        label: 'Tiếng Việt',
        locale: viVN,
        flag: vnFlag,
        fullkey: 'vi',
    },
};
