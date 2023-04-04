import { DATE_FORMAT_UTC_ISO } from '@/data';
import { IOption, TParam } from '@/interfaces';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { isBoolean, isDate } from 'lodash';
import qs, { StringifyOptions } from 'query-string';
import { dateMatchFormat, getBoolean, getNumber, isNumberic } from '.';

dayjs.extend(utc);

export const qsParseString = (param: TParam, defaultValue: string | undefined = undefined): string | undefined => {
    return param && typeof param === 'string' ? param : defaultValue;
};

export const qsParseNumber = (param: TParam, defaultValue: number | undefined = 0): number => {
    return isNumberic(param) ? getNumber(param) : defaultValue;
};

export const qsParseBoolean = (param: TParam, defaultValue: boolean | undefined = true): boolean => {
    return isBoolean(param) ? getBoolean(param) : defaultValue;
};

export const qsParseObject = (valueParam: TParam, labelParam: TParam, defaultValue: any = undefined, numberic = false): IOption<number> | undefined => {
    if (numberic) {
        return valueParam && isNumberic(valueParam) && labelParam
            ? {
                  value: getNumber(valueParam),
                  label: labelParam,
              }
            : defaultValue;
    }
    return valueParam && labelParam
        ? {
              value: valueParam + '',
              label: labelParam,
          }
        : defaultValue;
};

export const qsParseDate = (param: TParam, defaultValue: any = undefined, utc: false): Dayjs | undefined => {
    const dayValue = typeof param === 'string' ? dayjs(param) : undefined;
    return param && dayValue && isDate(param) ? (utc ? dayValue.utc() : dayValue) : defaultValue;
};

export const qsParseTimeRange = (from: TParam, to: TParam, dateFormat: string = DATE_FORMAT_UTC_ISO, defaultValue: any = undefined): Date[] => {
    return typeof from === 'string' && typeof to === 'string' && dateMatchFormat(from, dateFormat) && dateMatchFormat(to, dateFormat) ? [dayjs(from, dateFormat), dayjs(to, dateFormat)] : defaultValue;
};

export const qsStringify = (object: Record<string, any>, options?: StringifyOptions): string => {
    return qs.stringify(object, {
        sort: false,
        arrayFormat: 'comma',
        ...options,
    });
};
