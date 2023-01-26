import CustomInput from '@/components/form/CustomInput';
import CustomInputNumber from '@/components/form/CustomInputNumber';
import CustomInputTextArea from '@/components/form/CustomInputTextArea';
import CusPagination from '@/components/shared/CusPagination';
import { IDataSource, IPet } from '@/interfaces';
import { useNotify, usePagination } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Col, Descriptions, Form, Row, Space, Spin, Typography } from 'antd';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import * as yup from 'yup';
const { Title } = Typography;

const defaultValueForm = {
    name: '',
    species: '',
    age: 0,
};

function ReactQuery() {
    const t = useTranslations('ReactQuery');
    const tC = useTranslations('Common');
    const notify = useNotify();
    const { pagination, onChange } = usePagination({});

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

    const fetchPetList = (): Promise<IDataSource<IPet>> => {
        return axios.get('/api/pet').then((rp) => rp.data?.data);
    };

    const createPet = (data: IPet) => {
        return axios.post('/api/pet', data);
    };

    const deletePet = (id: string) => {
        return axios.delete(`/api/pet/${id}`);
    };

    const { refetch, isLoading, isFetching, data } = useQuery<IDataSource<IPet>, any>(['pets', pagination.page], fetchPetList, {
        cacheTime: 0,
        retry: false,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        onError: (error: any) => {
            notify.notifyError(error?.response?.data?.message);
        },
    });

    const { mutate: mutateCreate, isLoading: isLoadingCreate } = useMutation(createPet, {
        onSuccess: () => {
            refetch();
            reset();
        },
        onError: (error: any) => {
            notify.notifyError(error?.response?.data?.message);
        },
    });

    const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(deletePet, {
        onSuccess: () => {
            refetch();
            notify.notifySuccess();
        },
        onError: (error: any) => {
            notify.notifyError(error?.response?.data?.message);
        },
    });

    const onSuccess = (data: IPet) => {
        mutateCreate(data);
    };

    const onDelete = (id: string) => {
        mutateDelete(id);
    };

    const onEdit = (item: IPet) => {
        reset(item);
    };

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>

            <Title level={1}>{t('title')}</Title>
            <Row gutter={[12, 12]}>
                <Col md={8} sm={12} xs={24}>
                    <Title>{tC('form')}</Title>
                    <Spin spinning={isLoadingCreate}>
                        <Form layout="vertical" onFinish={handleSubmit(onSuccess)}>
                            <FormProvider {...formMethod}>
                                <CustomInput name="name" label={t('pet.name')} />
                                <CustomInputTextArea name="species" label={t('pet.species')} />
                                <CustomInputNumber name="age" label={t('pet.age')} />
                                <Space>
                                    <Button htmlType="submit">{tC('submit')}</Button>
                                    <Button onClick={() => reset(defaultValueForm)}>{tC('clear')}</Button>
                                </Space>
                            </FormProvider>
                        </Form>
                    </Spin>
                </Col>
                <Col md={8} sm={12} xs={24}>
                    <Title>{tC('list')}</Title>
                    <Space>
                        <Button onClick={() => refetch()}>{tC('refetch')}</Button>
                        <CusPagination page={pagination.page} limit={pagination.size} total={data?.total} onChange={onChange} />
                    </Space>
                    <Spin spinning={isLoading || isFetching}>
                        <Space direction="vertical">
                            {data?.data?.map((item) => (
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
                <Col md={8} sm={12} xs={24}></Col>
            </Row>
        </>
    );
}

export default ReactQuery;
