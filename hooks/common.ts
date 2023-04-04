import { IBaseFilterParams, IBaseModel, IDataSource, IMainResponse, IPaginationParams } from '@/interfaces';
import { useQuery } from 'react-query';

export const useLoadBase = (
    name: string,
    pagination: IPaginationParams,
    params: IBaseFilterParams,
    fetchFn: (params: IPaginationParams & IBaseFilterParams) => Promise<IMainResponse<IDataSource<IBaseModel>>>,
    onSuccess: (data: IMainResponse<IDataSource<IBaseModel>>) => void,
    onError: (error: unknown) => void,
) => {
    return useQuery<IMainResponse<IDataSource<IBaseModel>>, any>([name, { ...pagination, ...params }], () => fetchFn({ ...pagination, ...params, page: pagination.page - 1, is_using: true }), {
        retry: false,
        keepPreviousData: false,
        refetchOnWindowFocus: false,
        onSuccess,
        onError,
    });
};
