import { DATE_FORMAT_HMDMY } from '@/data';
import { isNaN } from 'lodash';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const stringFormat = (input: string, ...replacer: string[]) => {
    for (let i = 0; i < replacer.length; i++) {
        input = input.replaceAll(`{${i}}`, replacer[i]);
    }
    return input;
};

export const phoneFormat = (phone: string, defaultValue = '--') => {
    if (phone?.length > 0) {
        const arr = phone.split('');
        arr.splice(-3, 0, ' ');
        arr.splice(-7, 0, ' ');
        return arr.join('');
    }
    return defaultValue;
};

export const isNumberic = (value: any) => {
    return value && typeof value === 'string' && !isNaN(parseFloat(value));
};

export const getNumber = (value: any) => {
    return isNumberic(value) && parseFloat(value);
};

export const numberFormat = (value: number) => {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }).format(value);
};

export const dateFormat = (value: Date | number | string | undefined, format: string = DATE_FORMAT_HMDMY, utc = false, defaultValue = '--') => {
    const dayValue = value && dayjs(value);
    return dayValue ? (utc ? dayValue.utc().format(format) : dayValue.format(format)) : defaultValue;
};

export const dateMatchFormat = (str: any, format: string) => {
    return str && typeof str === 'string' && dayjs(str, format).valueOf() > 0;
};

export const arrayUnique = (arr: (string | number)[]) => {
    return arr?.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
};
