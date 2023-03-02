import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/data';
import { IOption } from '@/interfaces';
import { networkHandler, usePagination } from '@/utils';
import useDebounceValue from '@/utils/hooks';
import { Empty, Select, SelectProps, Spin } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import React, { forwardRef, useRef, useState } from 'react';
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from 'react-query';

export interface IAsyncSelectSearchProps {
    searchThreshold?: number;
    searchKey?: string;
    searchLocal?: boolean;
}

export interface IAsyncSelectOther {
    [key: string]: number | string | boolean | undefined | null;
}

export interface IAsyncSelectConfigProps {
    name: string;
    url: string;
    valueField: string | string[];
    labelField: string | string[];
    responseKey: string;
    totalKey?: string;
    search?: IAsyncSelectSearchProps;
    pageKey?: string;
    sizeKey?: string;
    size?: number;
    addtionalOptions?: IOption<any>[];
    lastOptions?: IOption<any>[];
    otherFilters?: IAsyncSelectOther;
    customLabel?: (label: string) => string;
    callback?: (options: any) => void;
    isCallbackInEveryFetch?: boolean;
}

export interface IAsyncSelectProps extends SelectProps {
    config: IAsyncSelectConfigProps;
    axiosConfig?: AxiosRequestConfig<any>;
}

export interface IAsyncSelectParams {
    page: number;
    size: number;
    search?: string;
    [key: string]: any;
}

export interface IAsyncSelectState {
    focus: boolean;
    options: IOption<any>[];
    search?: string;
    refresh: boolean;
}

const AsyncSelect = forwardRef<any, IAsyncSelectProps>((props, ref) => {
    const { config, axiosConfig, labelInValue, onChange, ...selectProps } = props;
    const {
        name,
        url,
        responseKey,
        totalKey = 'data.total',
        valueField,
        labelField,
        customLabel,
        pageKey = 'page',
        sizeKey = 'size',
        size = DEFAULT_SIZE,
        search,
        addtionalOptions = [],
        otherFilters,
        callback,
        isCallbackInEveryFetch = false,
    } = config;

    const { searchThreshold = 0, searchKey, searchLocal } = search || {};
    const { mode, showSearch = !!search } = selectProps;

    const { backToFirstPage, onChangeNextPage, getNextPage } = usePagination({ page: '1', size: size + '' });

    const [state, setState] = useState<IAsyncSelectState>(() => ({
        focus: false,
        options: [],
        search: undefined,
        refresh: true,
    }));

    const firstCall = useRef<any>(null);

    const handleFetch = (data: QueryFunctionContext<QueryKey, IAsyncSelectParams>) => {
        const { pageParam, queryKey } = data;

        const nPage = pageParam ? pageParam.page : DEFAULT_PAGE;
        const nSize = pageParam ? pageParam.size : size;
        const total = pageParam ? pageParam.total : 0;

        const queryKey_ = queryKey as any;
        const search = queryKey_ ? queryKey_?.[1]?.search : undefined;

        return networkHandler
            .get(url, {
                params: {
                    [pageKey]: nPage ? nPage - 1 : null,
                    [sizeKey]: nSize,
                    total,
                    refresh: state.refresh,
                    ...otherFilters,
                    ...(searchKey ? { [searchKey]: search || undefined } : undefined),
                },
                ...axiosConfig,
            })
            .then((rp) => {
                return rp.data;
            });
    };

    const debounceSearch = useDebounceValue(state.search, 500);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteQuery([`async-select-${name}`, { search: debounceSearch }], handleFetch, {
        refetchOnWindowFocus: false,
        cacheTime: 0,
        retry: false,
        getNextPageParam: (lastPage) => {
            const nextPage = getNextPage(get(lastPage, totalKey));
            return nextPage ? { page: nextPage, size: size, total: lastPage?.[totalKey], refresh: false } : undefined;
        },
        onSuccess: (data) => {
            if (callback instanceof Function) {
                const { pages } = data;
                const options = pages?.reduce((prev, cur) => [...prev, ...[responseKey ? cur.data?.[responseKey] : cur.data]], []);

                setState((prev) => ({ ...prev, options: [...addtionalOptions, ...options] }));

                if (!isCallbackInEveryFetch) {
                    if (!firstCall.current) {
                        firstCall.current = true;
                        callback(options);
                    }
                } else {
                    callback(options);
                }
            }
        },
        enabled: !!state.focus && (state.search ? state.search?.length >= searchThreshold : true),
    });

    const onFocus = () => {
        setState((prev) => ({ ...prev, focus: true }));
    };

    const onSearch = (value: string) => {
        setState((prev) => ({ ...prev, search: value, refresh: true }));
        backToFirstPage();
    };

    const handleChange = (value: any, option: any) => {
        if (onChange instanceof Function) {
            if (mode === 'multiple') {
                onChange(value[0] ? value : undefined, state.options);
            } else {
                onChange(value ? { ...option.data, ...value } : undefined, state.options);
            }
        }
    };

    const onLoadMore = () => {
        setState((prev) => ({ ...prev, refresh: false }));
        fetchNextPage();
        onChangeNextPage();
    };

    const onScroll = (e: any) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;
        if (!(isLoading || isFetchingNextPage) && scrollTop + offsetHeight >= scrollHeight && hasNextPage) {
            onLoadMore();
        }
    };

    const getValueFromKey = (data: any, key: string | string[]) => {
        if (typeof key === 'string') {
            return data?.[key];
        } else if (Array.isArray(key)) {
            return key.map((item) => get(data, item, '')).join(' - ');
        }
    };

    return (
        <Select
            ref={ref}
            style={{ width: '100%' }}
            labelInValue={true}
            optionLabelProp="label"
            optionFilterProp="label"
            notFoundContent={!isError && (isLoading || isFetchingNextPage) ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {...selectProps}
            showSearch={showSearch}
            filterOption={!!searchLocal}
            loading={isLoading || isFetchingNextPage}
            searchValue={state.search}
            onPopupScroll={onScroll}
            onSearch={!!(searchLocal || !showSearch) ? undefined : onSearch}
            onFocus={onFocus}
            onChange={handleChange}
        >
            {addtionalOptions?.map((item) => {
                let label = item?.label;
                label = label && typeof label === 'string' && customLabel instanceof Function ? customLabel(label) : label;
                return (
                    <Select.Option data={{ ...item }} key={item?.value} value={item?.value} label={label}>
                        {label}
                    </Select.Option>
                );
            })}
            {data?.pages?.map((page, index) => {
                const pageData = responseKey ? get(page, responseKey, undefined) : page;
                return (
                    <React.Fragment key={index}>
                        {pageData?.map((item: any) => {
                            let label = '';
                            const value = getValueFromKey(item, valueField);

                            if (typeof labelField === 'string') {
                                label = item?.[labelField];
                                label = customLabel instanceof Function ? customLabel(label) : label;
                            } else {
                                label = getValueFromKey(item, labelField);
                            }

                            return (
                                <Select.Option data={{ ...item }} key={value} value={value} label={label}>
                                    {label}
                                </Select.Option>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </Select>
    );
});

AsyncSelect.defaultProps = {
    labelInValue: true,
};

AsyncSelect.displayName = 'AsyncSelect';

export default AsyncSelect;
