import { DATE_FORMAT_HMDMY, DATE_FORMAT_UTC_ISO } from '@/data';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { cloneDeep, isNaN, snakeCase, startCase, upperCase } from 'lodash';
dayjs.extend(utc);

export const stringFormat = (input: string, ...replacer: any[]) => {
    for (let i = 0; i < replacer.length; i++) {
        input = input.replaceAll(`{${i}}`, replacer[i] + '');
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

export const isBoolean = (value: any) => {
    return (value && typeof value === 'string' && value === 'true') || value === 'false' ? true : false;
};

export const getBoolean = (value: any) => {
    return value === 'true' || value === 1 || value === '1';
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

export const getUniqueObjectByKey = <T>(arr: T[], key: keyof T): T[] => {
    return arr.reduce((acc: T[], curr: any) => {
        const index = acc.findIndex((obj) => obj[key] === curr[key]);
        if (index === -1) {
            acc.push(curr);
        }
        return acc;
    }, []);
};

export const arrayToTree = (array: any[], id = 'id', parentId = 'pid', children = 'children') => {
    const result: any = [];
    const hash: any = {};
    const data = cloneDeep(array);

    data.forEach((_, index) => {
        const value: any = data?.[index]?.[id] ?? undefined;
        if (value) {
            hash[value as keyof typeof hash] = data[index];
        }
    });

    data.forEach((item) => {
        const hashParent = hash[item[parentId]];
        if (hashParent) {
            !hashParent[children] && (hashParent[children] = []);
            hashParent[children].push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

export function queryAncestors(array: any, current: any, parentId: string, id = 'id') {
    const result = [current];
    const hashMap = new Map();
    array.forEach((item: any) => hashMap.set(item[id], item));

    const getPath = (current: any) => {
        const currentParentId = hashMap.get(current?.[id])?.[parentId];
        if (currentParentId) {
            result.push(hashMap.get(currentParentId));
            getPath(hashMap.get(currentParentId));
        }
    };

    getPath(current);
    return result;
}

export const getAllChildrenById = <T>(nodes: T[], key: any, id: keyof T, parent_id: keyof T): T[] => {
    const results: T[] = [];

    const node = nodes.find((n) => n?.[id] === key);

    if (node) {
        const children = nodes.filter((n) => n?.[parent_id] === node?.[id]);
        for (let child of children) {
            results.push(child);
            const childResults = getAllChildrenById(nodes, child?.[id], id, parent_id);
            results.push(...childResults);
        }
    }

    return results;
};

export function formatDateToString(data: Date, type: 'start' | 'end' | 'original' = 'original', format = DATE_FORMAT_UTC_ISO) {
    const value = data && dayjs(data);
    if (!value) return undefined;
    if (type === 'start') return value.startOf('date').format(format);
    if (type === 'end') return value.endOf('date').format(format);
    return value.format(format);
}

export function getValueBooleanSelect(value: string) {
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    return undefined;
}

export function findAllBranches<T>(node: T, nodes: T[], id: keyof T, parent_id: keyof T, branch: any[] = []): any[][] {
    branch.push(node?.[id]); // add current node to branch path
    const children = nodes.filter((n) => n?.[parent_id] === node?.[id]); // find children of current node
    if (children.length === 0) {
        return [branch]; // if node has no children, return the current branch
    }
    const branches: number[][] = [];
    for (const child of children) {
        const childBranches = findAllBranches(child, nodes, id, parent_id, [...branch]); // recursively find child branches
        branches.push(...childBranches); // add child branches to result
    }
    return branches;
}

interface Node {
    menu_id: number;
    parent_menu_id: number;
    value: string;
}

export const getFileExtension = (filename: string) => {
    return filename.split('.').pop() ?? '';
};

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
export const formatKeySnake = (key: string, suffix: string): string => snakeCase(key).toUpperCase() + '_' + upperCase(suffix).trim().split(' ').join('_');

export const formatKeyTitleCase = (key: string, suffix: string): string => startCase(key).split(' ').join('') + startCase(suffix).trim().split(' ').join('');

export const formatToCapitalizeCase = (key: string): string =>
    key
        .split('_')
        ?.map((item) => item?.[0]?.toUpperCase() + item.slice(1))
        ?.join(' ');
