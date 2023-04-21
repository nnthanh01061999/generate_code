import InputControl from '@/components/control/input/InputControl';
import { IDataSource, IImage, TCrawlImageFormValues } from '@/interfaces';
import { downloadImage, handleDownloadAllImage, useNotify } from '@/utils';
import { CheckOutlined, DownloadOutlined, EyeOutlined, ScanOutlined, ExpandOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Form, Image, Row, Space } from 'antd';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

function CrawlImage() {
    const t = useTranslations('CrawlImage');

    const notify = useNotify();

    const [selected, setSelected] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: IImage }>({});

    const schema = yup.object({
        url: yup.string().required('required'),
    });

    const formMethod = useForm<TCrawlImageFormValues>({
        defaultValues: {
            url: '',
        },
        resolver: yupResolver(schema),
    });

    const { handleSubmit } = formMethod;

    const fetchCrawl = (params: { url: string }): Promise<IDataSource<IImage>> => {
        return axios
            .get('/api/crawl', {
                params: {
                    ...params,
                },
            })
            .then((rp) => rp.data?.data);
    };

    const { mutate, isLoading, data } = useMutation(fetchCrawl, {
        onSuccess: () => {
            notify.success();
        },
        onError: (error: any) => {
            notify.error(error?.response?.data?.message);
        },
    });

    const onSubmit = (data: TCrawlImageFormValues) => {
        mutate(data);
    };

    const onSelected = (newItem: string) => {
        setSelected((prev) => {
            const isContain = prev.includes(newItem);
            return isContain ? prev.filter((item) => item !== newItem) : [...prev, newItem];
        });
    };

    const onSelectedAll = () => {
        setSelected((prev) => {
            return prev.length === data?.items.length ? [] : data?.items?.map((item) => item.src) || [];
        });
    };

    const onDownloadError = (data: IImage) => {
        setErrors((prev) => ({ ...prev, [data.src]: data }));
    };

    const onDownloadAll = () => {
        handleDownloadAllImage(selected, onDownloadError);
    };

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>

            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <FormProvider {...formMethod}>
                    <Row gutter={[24, 24]} align="middle">
                        <Col md={10} sm={24} xs={24}>
                            <InputControl name="url" label="URL" />
                        </Col>
                        <Col md={14} sm={24} xs={24}>
                            <Row justify="end" style={{ padding: 8 }}>
                                <Space>
                                    <Button icon={<ScanOutlined />} loading={isLoading} htmlType="submit">
                                        {t('crawl')}
                                    </Button>
                                    <Button icon={<ExpandOutlined />} onClick={onSelectedAll} disabled={!data?.items}>
                                        {t('selected-all')}
                                    </Button>
                                    <Button icon={<DownloadOutlined />} onClick={onDownloadAll} disabled={!selected.length}>
                                        {t('download-all')}
                                    </Button>
                                </Space>
                            </Row>
                        </Col>
                    </Row>
                </FormProvider>
            </Form>

            <Row gutter={[24, 24]}>
                {data?.items?.map((item, index) => {
                    const isError = errors?.[item.src];
                    return (
                        <Col key={index} xl={8} md={12} sm={12} xs={24}>
                            <Row justify="center" style={{ position: 'relative', border: selected.includes(item.src) ? '4px lightgreen solid' : '4px transparent solid' }}>
                                <Image style={isError ? { opacity: 0.5 } : {}} src={item.src} alt={item.alt} height={200} />
                                {isError && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            fontSize: 20,
                                            color: 'white',
                                            padding: '16px',
                                            backgroundColor: 'red',
                                            opacity: '0.85',
                                            width: '100%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Error Download
                                    </span>
                                )}
                            </Row>
                            <Row justify="center" style={{ padding: 8 }}>
                                <Space>
                                    <Button type="ghost" icon={<CheckOutlined />} onClick={() => onSelected(item.src)} />
                                    <Button type="ghost" icon={<DownloadOutlined />} onClick={() => downloadImage(item, onDownloadError)} />
                                    <a href={item.src} download target="_blank" rel="noreferrer" className="self-center">
                                        <EyeOutlined style={{ color: 'white' }} />
                                    </a>
                                </Space>
                            </Row>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}

export default CrawlImage;
