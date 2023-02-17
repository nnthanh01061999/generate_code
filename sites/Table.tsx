import FooterGenerate from '@/components/footer/FooterGenerate';
import CustomCheckBoxGroup from '@/components/form/CustomCheckBoxGroup';
import CustomInput from '@/components/form/CustomInput';
import CustomInputTextArea from '@/components/form/CustomInputTextArea';
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
            <Row gutter={[12, 12]}>
                <Col md={12} sm={24} xs={24}>
                    <Form layout="vertical">
                        <FormProvider {...formMethod}>
                            <CustomInputTextArea name="json" label="Json" />
                            <CustomInput name="key" label="Key" />
                            <Button onClick={handleSubmit(onGetKeyFormJson, (error) => console.log(error))}> Get Key</Button>
                            <CustomCheckBoxGroup name="actions" label="actions" childProps={{ options: ['delete', 'update', 'view'] }} />
                            <CustomInput name="rowKey" label="rowKey" />
                            <CustomInput name="interface" label="interface" />
                            <ColumnList name="columns" />
                        </FormProvider>
                    </Form>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Result name={watch('key')} config={resultArr} data={result} />
                </Col>
            </Row>

            <FooterGenerate callback={handleSubmit(onGenerate, (error) => console.log(error))} />
        </>
    );
}

export default Generate;
