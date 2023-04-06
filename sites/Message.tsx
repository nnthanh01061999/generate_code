import InputControl from '@/components/control/input/InputControl';
import InputTextAreaControl from '@/components/control/input/InputTextAreaControl';
import FooterGenerate from '@/components/footer/FooterGenerate';
import Result from '@/components/site/generate/Result';
import FieldGrid from '@/components/site/message/FieldGrid';
import { generateMessages } from '@/function/message';
import { TMessageFormValues } from '@/interfaces';
import { formatToCapitalizeCase } from '@/utils';
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

    const formMethod = useForm<TMessageFormValues>({
        defaultValues: {
            key: '',
        },
        resolver: yupResolver(schema),
    });

    const { watch, setValue, handleSubmit } = formMethod;
    const [result, setResult] = React.useState<any>(() => undefined);

    const setResultValue = (key: string, resultString: string) => {
        setResult((prev: any) => ({ ...prev, [key]: resultString }));
    };

    const onGetKeyFormJson = (values: TMessageFormValues) => {
        const dataJson = JSON.parse(values.json);
        let uniqueKeys = Object.keys(Object.assign({}, ...dataJson));
        const columns = uniqueKeys.map((item) => {
            return {
                key: snakeCase(item),
                name: formatToCapitalizeCase(item),
            };
        });
        setValue('fields', columns);
    };

    const onGenerate = (values: TMessageFormValues) => {
        generateMessages('message', values, setResultValue);
    };

    const resultArr = React.useMemo(() => {
        return [
            {
                key: 'message',
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
                <Col md={24} sm={24} xs={24}>
                    <Form layout="vertical">
                        <FormProvider {...formMethod}>
                            <InputControl name="key" label="Key" />
                            <InputTextAreaControl name="json" label="Json" />
                            <Button onClick={handleSubmit(onGetKeyFormJson, (error) => console.log(error))}> Get Keys</Button>
                            <FieldGrid name="fields" />
                        </FormProvider>
                    </Form>
                </Col>
                <Col md={24} sm={24} xs={24}>
                    <Result name={watch('key')} config={resultArr} data={result} fileType="json" />
                </Col>
            </Row>

            <FooterGenerate callback={handleSubmit(onGenerate, (error) => console.log(error))} />
        </>
    );
}

export default Generate;
