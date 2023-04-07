import InputTextAreaControl from '@/components/control/input/InputTextAreaControl';
import FooterGenerate from '@/components/footer/FooterGenerate';
import Result from '@/components/site/generate/Result';
import FieldGrid from '@/components/site/schema-to-yup/FieldGrid';
import { convertAttributesToElements, generateYupSchema, xml2json } from '@/function/schemaToYup/yupGenerateFormJson.js';
import { copyTextToClipboard } from '@/utils';
import { Button, Col, Form, Input, Popover, Row, Space, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const { TextArea } = Input;

const { Title, Text } = Typography;

const sqlQuery = `SELECT TABLE_NAME AS '@Name', CASE WHEN TABLE_TYPE = 'BASE TABLE' THEN 'Table' ELSE 'View' END AS '@Type',
(
    SELECT Column_Name as '@Name',
            DATA_TYPE as '@DataType',
            case data_type 
                when 'nvarchar' 
                then CHARACTER_MAXIMUM_LENGTH 
                when 'varchar'  
                then CHARACTER_MAXIMUM_LENGTH
                else null 
            end  as '@Length',
            IS_NULLABLE AS '@IsNullable',
            COLUMNPROPERTY(OBJECT_ID(TABLE_NAME), COLUMN_NAME, 'IsIdentity') AS '@IsIdentity',

            (SELECT tc.CONSTRAINT_TYPE FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
INNER JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE cu ON tc.CONSTRAINT_NAME = cu.CONSTRAINT_NAME
WHERE tc.TABLE_NAME = INFORMATION_SCHEMA.COLUMNS.TABLE_NAME AND cu.COLUMN_NAME = INFORMATION_SCHEMA.COLUMNS.Column_Name) AS '@Constraint'

    FROM INFORMATION_SCHEMA.COLUMNS 
    where INFORMATION_SCHEMA.COLUMNS.TABLE_NAME = 
        INFORMATION_SCHEMA.TABLES.TABLE_NAME
    order by INFORMATION_SCHEMA.COLUMNS.ORDINAL_POSITION
    For XML PATH ('Column'), type
)

FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA='dbo' AND TABLE_NAME ='example'
ORDER BY TABLE_NAME ASC  
For XML PATH ('Table'),Root('Tables')`;

function Generate() {
    const t = useTranslations('Generate');

    const formMethod = useForm<any>({});

    const { watch, setValue, handleSubmit } = formMethod;
    const [result, setResult] = React.useState<any>(() => undefined);

    const setResultValue = (key: string, resultString: string) => {
        setResult((prev: any) => ({ ...prev, [key]: resultString }));
    };

    const onGetKeyFormJson = (values: any) => {
        if (values.json) {
            const value = generateYupSchema(JSON.parse(values.json));
            const fields = Object.entries(value)?.map(([key, val]) => {
                return {
                    key,
                    val,
                };
            });
            setValue('fields', fields);
        }
    };

    const onConvertXMl = (values: any) => {
        if (values.xml) {
            const xmlString = convertAttributesToElements(values.xml);
            const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml');
            const jsonObj = xml2json(xmlDoc);
            const value = generateYupSchema(jsonObj);
            const fields = Object.entries(value)?.map(([key, val]) => {
                return {
                    key,
                    val,
                };
            });
            setValue('fields', fields);
        }
    };

    const onGenerate = (values: any) => {
        const result = `yup.object({${values.fields?.reduce((prev: string, cur: { key: string; val: string }) => {
            return prev + `\n\t${cur.key} : ${cur.val},`;
        }, '')}\n})`;
        setResultValue('schema', result);
    };

    const resultArr = React.useMemo(() => {
        return [
            {
                key: 'schema',
            },
        ];
    }, []);

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>

            <Title level={1}>{t('title')}</Title>
            <Title level={3}>Generate Yup Schema from SQL Schema</Title>
            <Text>
                <Popover
                    content={
                        <Form.Item
                            htmlFor={'query'}
                            label={
                                <Space
                                    style={{
                                        display: 'flex',
                                        width: '100vw',
                                        justifyContent: 'space-between',
                                    }}
                                    align="center"
                                >
                                    <Space>
                                        <Button onClick={() => copyTextToClipboard('query')}>{t('copy')}</Button>
                                    </Space>
                                </Space>
                            }
                            style={{ height: 300, width: 400 }}
                        >
                            <TextArea id={'query'} value={sqlQuery} style={{ height: 300 }} />
                        </Form.Item>
                    }
                >
                    <span style={{ color: 'lightblue', textDecoration: 'underline' }}>Query here</span>
                </Popover>
            </Text>
            <FormProvider {...formMethod}>
                <Form layout="vertical">
                    <Row gutter={[24, 24]}>
                        <Col md={12} sm={24} xs={24}>
                            <InputTextAreaControl name="xml" label="xml" childProps={{ rows: 6 }} />
                            <Button onClick={handleSubmit(onConvertXMl, (error) => console.log(error))}> Get xml</Button>
                        </Col>

                        <Col md={12} sm={24} xs={24}>
                            <InputTextAreaControl name="json" label="Json" childProps={{ rows: 6 }} />
                            <Button onClick={handleSubmit(onGetKeyFormJson, (error) => console.log(error))}> Get Keys</Button>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
                        <Col md={16} sm={24} xs={24}>
                            <FieldGrid name="fields" />
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
