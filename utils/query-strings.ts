import { IOption } from '@/interfaces';
import { TParam } from '@/interfaces/query-string';
import { isDate } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import qs, { StringifyOptions } from 'query-string';
import { getNumber, isNumberic } from '.';
dayjs.extend(utc);

export const qsParseString = (param: TParam, defaultValue: ''): string => {
    return param && typeof param === 'string' ? param : defaultValue;
};

export const qsParseNumber = (param: TParam, defaultValue = 0): number => {
    return isNumberic(param) ? getNumber(param) : defaultValue;
};

export const qsParseObject = (valueParam: TParam, labelParam: TParam, defaultValue = undefined, numberic = false): IOption<number | string> | undefined => {
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

export const qsParseDate = (param: TParam, defaultValue = undefined, utc: false): Dayjs | undefined => {
    const dayValue = typeof param === 'string' ? dayjs(param) : undefined;
    return param && dayValue && isDate(param) ? (utc ? dayValue.utc() : dayValue) : defaultValue;
};

export const qsStringify = (object: Record<string, any>, options?: StringifyOptions): string => {
    return qs.stringify(object, {
        sort: false,
        arrayFormat: 'comma',
        ...options,
    });
};
