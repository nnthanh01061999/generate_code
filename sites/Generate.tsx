import FooterGenerate from '@/components/footer/FooterGenerate';
import Common from '@/components/generate/Common';
import FormSearchCreate from '@/components/generate/FormSearchCreate';
import Result from '@/components/generate/Result';
import TableColumn from '@/components/generate/TableColumn';
import { generateForm, generateInterface, generateLocale, generateTableColumn } from '@/function/generate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Form, Row, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
const { Title } = Typography;

function Generate() {
    const t = useTranslations('Generate');
    const schema = yup.object({
        key: yup.string().required('required'),
    });

    const formMethod = useForm<any>({
        defaultValues: {
            tableHeaderType: 'none',
        },
        resolver: yupResolver(schema),
    });
    const { handleSubmit } = formMethod;
    const [result, setResult] = React.useState<any>(() => undefined);

    const setResultValue = (key: string, resultString: string) => {
        setResult((prev: any) => ({ ...prev, [key]: resultString }));
    };

    const onGenerate = (values: any) => {
        generateLocale(values, setResultValue);
        generateForm(values, setResultValue);
        generateTableColumn(values, setResultValue);
        generateInterface(values, setResultValue);
    };

    const resultArr = React.useMemo(() => {
        return [
            {
                key: 'locale',
            },
            {
                key: 'form',
            },
            {
                key: 'table',
            },
            {
                key: 'column',
            },
            {
                key: 'interface',
            },
        ];
    }, []);

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>

            <div style={{ display: 'flex', flexDirection: 'column', padding: 30, height: '100vh', overflow: 'auto' }}>
                <Title level={1}>{t('title')}</Title>
                <Row gutter={[12, 12]}>
                    <Col md={12} sm={24} xs={24}>
                        <Form layout="vertical">
                            <FormProvider {...formMethod}>
                                <Common />
                                <FormSearchCreate name="search" />
                                <FormSearchCreate name="form" />
                                <TableColumn name="table" />
                            </FormProvider>
                        </Form>
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                        <Result config={resultArr} data={result} />
                    </Col>
                </Row>
            </div>

            <FooterGenerate callback={handleSubmit(onGenerate)} />
        </>
    );
}

export default Generate;
