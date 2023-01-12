import { IOption } from '@/interfaces';
import { TParam } from '@/interfaces/query-string';
import { isDate } from 'lodash';
import moment, { Moment } from 'moment';
import qs, { StringifyOptions } from 'query-string';
import { getNumber, isNumberic } from '.';

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

export const qsParseDate = (param: TParam, defaultValue = undefined, utc: false): Moment | undefined => {
    const momentVal = moment(param);
    return param && isDate(param) ? (utc ? momentVal.utc() : momentVal) : defaultValue;
};

export const qsStringify = (object: Record<string, any>, options?: StringifyOptions): string => {
    return qs.stringify(object, {
        sort: false,
        arrayFormat: 'comma',
        ...options,
    });
};
