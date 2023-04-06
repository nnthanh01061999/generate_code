import CheckBoxControl from '@/components/control/checkbox/CheckboxControl';
import InputControl from '@/components/control/input/InputControl';
import InputTextAreaControl from '@/components/control/input/InputTextAreaControl';
import FooterGenerate from '@/components/footer/FooterGenerate';
import FormGrid from '@/components/site/form/FormGrid';
import Result from '@/components/site/generate/Result';
import { generateForm } from '@/function/form';
import { TFormFormValues } from '@/interfaces';
import { detectObjectInterface } from '@/utils';
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

    const formMethod = useForm<TFormFormValues>({
        defaultValues: {
            key: '',
            schema: false,
        },
        resolver: yupResolver(schema),
    });

    const { watch, setValue, handleSubmit } = formMethod;
    const [result, setResult] = React.useState<any>(() => undefined);

    const setResultValue = (key: string, resultString: string) => {
        setResult((prev: any) => ({ ...prev, [key]: resultString }));
    };

    const onGetKeyFormJson = (values: TFormFormValues) => {
        const dataJson = JSON.parse(values.json);
        const dataType = detectObjectInterface(dataJson);
        let uniqueKeys = Object.keys(Object.assign({}, ...dataJson));
        const forms = uniqueKeys.map((item) => {
            const interfaceType = dataType?.[item as keyof typeof dataType];
            let type = 'input';
            if (interfaceType === 'number') {
                type = 'input-number';
            }
            if (interfaceType === 'boolean') {
                type = 'switch';
            }
            return {
                key: snakeCase(item),
                type: type,
                xs: 24,
                sm: 24,
                md: 12,
                required: false,
            };
        });
        setValue('forms', forms);
    };

    const onGenerate = (values: TFormFormValues) => {
        generateForm('form', values, setResultValue);
    };

    const resultArr = React.useMemo(() => {
        return [
            {
                key: 'form',
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
                            <CheckBoxControl name="schema" labelCheckBox="schema" />
                            <Button onClick={handleSubmit(onGetKeyFormJson, (error) => console.log(error))}> Get Key</Button>
                            <InputControl name="interface" label="interface" />
                            <FormGrid name="forms" />
                        </FormProvider>
                    </Form>
                </Col>
                <Col md={24} sm={24} xs={24}>
                    <Result name={watch('key')} config={resultArr} data={result} fileType="tsx" />
                </Col>
            </Row>

            <FooterGenerate callback={handleSubmit(onGenerate, (error) => console.log(error))} />
        </>
    );
}

export default Generate;
