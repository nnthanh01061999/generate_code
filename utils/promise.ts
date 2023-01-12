import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/data/pagination';
import { get } from 'lodash';

export function getTotalPageFromTotal(total: number, limit: number) {
    if (total > 0) {
        let totalPage = Math.floor(total / limit);
        totalPage = total - totalPage * limit > 0 ? totalPage + 1 : totalPage;
        return totalPage;
    }
    return 0;
}

export const promiseAllPagination = async <T>(source: (params: any) => Promise<T>, params: any = {}, totalKey: string, startPage = DEFAULT_PAGE - 1, limit = DEFAULT_SIZE) => {
    const response = await source(params);
    const total = get(response, totalKey, 0);
    const totalPage = getTotalPageFromTotal(total, limit);

    const promiseArr: Array<Promise<T>> = [];
    for (let i = startPage; i < totalPage; i++) {
        promiseArr.push(
            source({
                ...params,
                page: i,
                size: limit,
            }),
        );
    }

    const results = await Promise.all(promiseArr);
    return results;
};
