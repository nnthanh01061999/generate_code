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
        let uniqueKeys = Object.keys(Object.assign({}, ...dataJson));
        const columns = uniqueKeys.map((item) => {
            return {
                key: snakeCase(item),
                type: 'string',
            };
        });
        setValue('columns', columns);
    };

    const onGenerate = (values: TTableFormValues) => {
        generateTable(values, setResultValue);
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
            <Row gutter={[24, 24]}>
                <Col md={12} sm={24} xs={24}>
                    <Form layout="vertical">
                        <FormProvider {...formMethod}>
                            <InputControl name="key" label="Key" />
                            <InputTextAreaControl name="json" label="Json" />
                            <Button onClick={handleSubmit(onGetKeyFormJson, (error) => console.log(error))}> Get Keys</Button>
                            <CheckBoxGroupControl name="actions" label="actions" childProps={{ options: ['delete', 'update', 'view'] }} />
                            <InputControl name="rowKey" label="rowKey" />
                            <InputControl name="interface" label="interface" />
                            <ColumnForm name="columns" />
                        </FormProvider>
                    </Form>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Result name={watch('key')} config={resultArr} data={result} tsx />
                </Col>
            </Row>

            <FooterGenerate callback={handleSubmit(onGenerate, (error) => console.log(error))} />
        </>
    );
}

export default Generate;
