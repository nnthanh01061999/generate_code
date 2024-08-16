import FooterGenerate from '@/components/footer/FooterGenerate';
import CheckBoxGroupControl from '@/components/control/checkbox/CheckboxGroupControl';
import InputControl from '@/components/control/input/InputControl';
import InputTextAreaControl from '@/components/control/input/InputTextAreaControl';
import Result from '@/components/site/generate/Result';
import ColumnList from '@/components/site/table/ColumnList';
import { generateTable } from '@/function/table';
import { TTableFormValues } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Form, Row, Typography } from 'antd';
import { snakeCase } from 'lodash';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import ColumnForm from '@/components/site/table/ColumnForm';
import { detectObjectInterface } from '@/utils';
const { Title } = Typography;

function Generate() {
    const t = useTranslations('Generate');

    const schema = yup.object({
        key: yup.string().required('required'),
    });

    const formMethod = useForm<TTableFormValues>({
        defaultValues: {
            key: '',
            rowKey: 'id',
        },
        resolver: yupResolver(schema),
    });

    const { watch, setValue, handleSubmit } = formMethod;
    const [result, setResult] = React.useState<any>(() => undefined);

    const setResultValue = (key: string, resultString: string) => {
        setResult((prev: any) => ({ ...prev, [key]: resultString }));
    };

    const onGetKeyFormJson = (values: TTableFormValues) => {
        const dataJson = JSON.parse(values.json);

        const dataType = detectObjectInterface(dataJson);
        let uniqueKeys = Object.keys(Object.assign({}, ...dataJson));
        const columns = uniqueKeys.map((item) => {
            return {
                key: snakeCase(item),
                type: dataType?.[item as keyof typeof dataType],
                width: 160,
            };
        });
        setValue('columns', columns);
    };

    const onGenerate = (values: TTableFormValues) => {
        generateTable('tables', values, setResultValue);
    };

    const resultArr = React.useMemo(() => {
        return [
            {
                key: 'tables',
            },
        ];
    }, []);

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>

            <Title level={1}>{t('title')}</Title>

            <FormProvider {...formMethod}>
                <Form layout="vertical">
                    <Row gutter={[24, 24]}>
                        <Col md={8} sm={24} xs={24}>
                            <InputTextAreaControl childProps={{ rows: 6 }} name="json" label="Json" />
                            <Button onClick={handleSubmit(onGetKeyFormJson, (error) => console.log(error))}> Get Keys</Button>
                        </Col>
                        <Col md={16} sm={24} xs={24}>
                            <Row gutter={[24, 24]}>
                                <Col md={12} sm={24} xs={24}>
                                    <InputControl name="key" label="Key" />
                                </Col>
                                <Col md={12} sm={24} xs={24}>
                                    <InputControl name="rowKey" label="rowKey" />
                                </Col>
                                <Col md={12} sm={24} xs={24}>
                                    <InputControl name="interface" label="interface" />
                                </Col>
                                <Col md={12} sm={24} xs={24}>
                                    <InputControl name="workspace" label="workspace" />
                                </Col>
                                <Col md={12} sm={24} xs={24}>
                                    <CheckBoxGroupControl name="actions" label="actions" childProps={{ options: ['create', 'delete', 'update'] }} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={[24, 24]}>
                        <Col md={16} sm={24} xs={24}>
                            <ColumnForm name="columns" />
                        </Col>
                        <Col md={8} sm={24} xs={24}>
                            <Result name={watch('key')} config={resultArr} data={result} fileType="tsx" />
                        </Col>
                    </Row>
                </Form>
            </FormProvider>

            <FooterGenerate callback={handleSubmit(onGenerate, (error) => console.log(error))} />
        </>
    );
}

export default Generate;
