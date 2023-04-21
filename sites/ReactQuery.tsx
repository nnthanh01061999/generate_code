import InputControl from '@/components/control/input/InputControl';
import InputNumberControl from '@/components/control/input/InputNumberControl';
import InputTextAreaControl from '@/components/control/input/InputTextAreaControl';
import CusPagination from '@/components/shared/CusPagination';
import { IDataSource, IPet } from '@/interfaces';
import { useNotify, usePagination } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Descriptions, Form, Row, Space, Spin, Typography } from 'antd';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryFunctionContext, QueryKey, useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import * as yup from 'yup';
const { Title } = Typography;

const defaultValueForm = {
    name: '',
    species: '',
    age: 0,
};

interface IGetPetParam {
    page: number;
    size: number;
}

function ReactQuery() {
    const t = useTranslations('ReactQuery');
    const tC = useTranslations('Common');
    const notify = useNotify();
    const queryClient = useQueryClient();
    const { backToFirstPage, pagination, onChange } = usePagination({});
    const { backToFirstPage: backToFirstPageInfinite, onChangeNextPage, getNextPage } = usePagination({ page: '1', size: '1' });

    const [action, setAtion] = useState(() => ({
        action: 'create',
        id: '',
    }));

    const schema = yup.object({
        name: yup.string().required(),
        species: yup.string().required(),
        age: yup.number().required().typeError('Must be a number'),
    });

    const formMethod = useForm<IPet>({
        defaultValues: defaultValueForm,
        resolver: yupResolver(schema),
    });

    const { handleSubmit, reset } = formMethod;

    const fetchPetList = (page = 0, size = 20): Promise<IDataSource<IPet>> => {
        return axios
            .get('/api/pet', {
                params: {
                    page: page ? page - 1 : null,
                    size,
                },
            })
            .then((rp) => rp.data?.data);
    };

    const fetchPetListInfinite = (data: QueryFunctionContext<QueryKey, IGetPetParam>): Promise<IDataSource<IPet>> => {
        const { pageParam } = data;
        const page = pageParam ? pageParam.page : 1;
        const size = pageParam ? pageParam.size : 1;
        return axios
            .get('/api/pet', {
                params: {
                    page: page ? page - 1 : null,
                    size,
                },
            })
            .then((rp) => rp.data?.data);
    };

    const createPet = (data: IPet) => {
        return axios.post('/api/pet', data);
    };

    const updatePet = ({ id, data }: { id: string; data: IPet }) => {
        return axios.put(`/api/pet/${id}`, data);
    };

    const deletePet = (id: string) => {
        return axios.delete(`/api/pet/${id}`);
    };

    const { refetch, isLoading, isFetching, data } = useQuery<IDataSource<IPet>, any>(
        ['pets', { page: pagination.page, size: pagination.size }],
        () => fetchPetList(pagination.page, pagination.size),
        {
            cacheTime: 0,
            retry: true,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            onError: (error: any) => {
                notify.error(error?.response?.data?.message);
            },
        },
    );

    const {
        refetch: refetchInfinite,
        data: dataInfinite,
        fetchNextPage: fetchNextPageInfinite,
        hasNextPage: hasNextPageInfinite,
        isFetchingNextPage: isFetchingNextPageInfinite,
        isLoading: isLoadingInfinite,
    } = useInfiniteQuery('pets-infinite', fetchPetListInfinite, {
        getNextPageParam: (lastPage) => {
            const nextPage = getNextPage(lastPage.total);
            return nextPage ? { page: nextPage, size: 1 } : undefined;
        },
        refetchOnWindowFocus: false,
    });

    const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(createPet, {
        onSuccess: () => {
            reset(defaultValueForm);
            queryClient.invalidateQueries(['pets', { page: pagination.page, size: pagination.size }]);
            queryClient.invalidateQueries('pets-infinite');
            notify.success();
        },
        onError: (error: any) => {
            notify.error(error?.response?.data?.message);
        },
    });

    const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(updatePet, {
        onSuccess: () => {
            reset(defaultValueForm);
            queryClient.invalidateQueries(['pets', { page: pagination.page, size: pagination.size }]);
            queryClient.invalidateQueries('pets-infinite');
            notify.success();
        },
        onError: (error: any) => {
            notify.error(error?.response?.data?.message);
        },
    });

    const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(deletePet, {
        onSuccess: () => {
            reset(defaultValueForm);
            queryClient.invalidateQueries(['pets', { page: pagination.page, size: pagination.size }]);
            queryClient.invalidateQueries('pets-infinite');
            notify.success();
        },
        onError: (error: any) => {
            notify.error(error?.response?.data?.message);
        },
    });

    const onSuccess = (data: IPet) => {
        if (action.action === 'create') {
            mutateCreate(data);
        } else if (action.action === 'update') {
            mutateUpdate({ id: action.id, data });
        }
    };

    const onDelete = (id: string) => {
        mutateDelete(id);
    };

    const onEdit = (item: IPet) => {
        setAtion((prev) => ({ ...prev, action: 'update', id: item._id }));
        reset(item);
    };

    const onRefresh = () => {
        refetch();
        backToFirstPage();
    };

    const onClear = () => {
        reset(defaultValueForm);
        setAtion((prev) => ({ ...prev, action: 'create', id: '' }));
    };

    const onLoadMore = () => {
        fetchNextPageInfinite();
        onChangeNextPage();
    };

    const onRefreshInfinite = () => {
        refetchInfinite();
        backToFirstPageInfinite();
    };

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>

            <Title level={1}>{t('title')}</Title>
            <Row gutter={[12, 12]}>
                <Col md={8} sm={12} xs={24}>
                    <Title>{tC('form_')}</Title>
                    <Spin spinning={isLoadingCreate || isLoadingUpdate}>
                        <Form layout="vertical" onFinish={handleSubmit(onSuccess)}>
                            <FormProvider {...formMethod}>
                                <InputControl name="name" label={t('pet.name')} />
                                <InputTextAreaControl name="species" label={t('pet.species')} />
                                <InputNumberControl name="age" label={t('pet.age')} />
                                <Space>
                                    <Button htmlType="submit">{tC('submit')}</Button>
                                    <Button onClick={onClear}>{tC('clear')}</Button>
                                </Space>
                            </FormProvider>
                        </Form>
                    </Spin>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <Title>{tC('list')}</Title>
                    <Button onClick={onRefresh}>{tC('refetch')}</Button>
                    <CusPagination page={pagination.page} limit={pagination.size} total={data?.total} onChange={onChange} />
                    <Spin spinning={isLoading || isFetching}>
                        <Space direction="vertical">
                            {data?.items?.map((item) => (
                                <Card
                                    key={item._id}
                                    title={item.name}
                                    extra={
                                        <Space>
                                            <Button onClick={() => onEdit(item)}>{tC('update')}</Button>
                                            <Button disabled={isLoadingDelete} onClick={() => onDelete(item._id)}>
                                                {tC('delete')}
                                            </Button>
                                        </Space>
                                    }
                                >
                                    <Descriptions column={24}>
                                        <Descriptions.Item span={12} label={t('pet.species')}>
                                            {item.species}
                                        </Descriptions.Item>
                                        <Descriptions.Item span={12} label={t('pet.age')}>
                                            {item.age}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            ))}
                        </Space>
                    </Spin>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <Title>{tC('infiniteList')}</Title>
                    <Button onClick={onRefreshInfinite}>{tC('refetch')}</Button>
                    <Spin spinning={isLoadingInfinite}>
                        <Space direction="vertical">
                            {dataInfinite?.pages?.map((pets, index) => (
                                <React.Fragment key={index}>
                                    {pets.items?.map((item) => (
                                        <Card
                                            key={item._id}
                                            title={item.name}
                                            extra={
                                                <Space>
                                                    <Button onClick={() => onEdit(item)}>{tC('update')}</Button>
                                                    <Button disabled={isLoadingDelete} onClick={() => onDelete(item._id)}>
                                                        {tC('delete')}
                                                    </Button>
                                                </Space>
                                            }
                                        >
                                            <Descriptions column={24}>
                                                <Descriptions.Item span={12} label={t('pet.species')}>
                                                    {item.species}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={12} label={t('pet.age')}>
                                                    {item.age}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Card>
                                    ))}
                                </React.Fragment>
                            ))}
                            <Button disabled={!hasNextPageInfinite || isFetchingNextPageInfinite} onClick={onLoadMore}>
                                {isFetchingNextPageInfinite ? tC('loadingMore') : hasNextPageInfinite ? tC('loadMore') : tC('nothingMore')}
                            </Button>
                        </Space>
                    </Spin>
                </Col>
            </Row>
        </>
    );
}

export default ReactQuery;
