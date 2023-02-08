import { localeArr } from '@/data';
import { notification } from 'antd';

export const copyTextToClipboard = (id: string) => {
    var copyText = document.getElementById(id) as HTMLInputElement;
    if (copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
    }
    notification.open({
        message: 'Copy to Clipboard',
        description: 'Code have been copy to clipboard',
    });
};

export const formatUrlRemoveLocale = (url: string) => {
    const values = url?.split('?')[0]?.split('/');
    const value = values[1];
    const other = values?.splice(2);
    return localeArr?.[value as keyof typeof localeArr] ? '/' + other?.join('/') : url;
};
