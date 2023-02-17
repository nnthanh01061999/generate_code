import FooterGenerate from '@/components/footer/FooterGenerate';
import CustomCheckBox from '@/components/form/CustomCheckBox';
import CustomInput from '@/components/form/CustomInput';
import Result from '@/components/site/generate/Result';
import ActionList from '@/components/site/reducer/ActionList';
import StateList from '@/components/site/reducer/StateList';
import { generateAction, generateActionType, generateHook, generateReducer, generateType } from '@/function/reducer';
import { TReducerFormValues } from '@/interfaces';
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
        state: yup.array().of(
            yup.object({
                key: yup.string().required('required state'),
                type: yup.string().required('type state'),
            }),
        ),
        actions: yup.array().of(
            yup.object({
                key: yup.string().required('required action key'),
                payload: yup.array().of(
                    yup.object({
                        key: yup.string().required('required payload key'),
                        type: yup.string().required('type pay load type'),
                    }),
                ),
            }),
        ),
    });

    const formMethod = useForm<TReducerFormValues>({
        defaultValues: {
            key: '',
            withClientState: false,
            state: [
                {
                    key: '',
                    type: 'string',
                },
            ],
            actions: [
                {
                    key: '',
                    payload: [
                        {
                            key: '',
                            type: 'string',
                        },
                    ],
                },
            ],
        },
        resolver: yupResolver(schema),
    });

    const { watch, handleSubmit } = formMethod;
    const [result, setResult] = React.useState<any>(() => undefined);

    const setResultValue = (key: string, resultString: string) => {
        setResult((prev: any) => ({ ...prev, [key]: resultString }));
    };

    const onGenerate = (values: TReducerFormValues) => {
        generateActionType(values, setResultValue);
        generateAction(values, setResultValue);
        generateType(values, setResultValue);
        generateHook(values, setResultValue);
        generateReducer(values, setResultValue);
    };

    const resultArr = React.useMemo(() => {
        return [
            {
                key: 'actions',
            },
            {
                key: 'reducer',
            },
            {
                key: 'hook',
            },
            {
                key: 'types',
            },
            {
                key: 'action-types',
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
                            <CustomInput name="key" label="Key" />
                            <CustomCheckBox label="Cache" labelCheckBox="Yes" name="withClientState" />
                            <StateList name="state" />
                            <ActionList name="actions" />
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
