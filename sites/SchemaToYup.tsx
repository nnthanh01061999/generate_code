import InputTextAreaControl from '@/components/control/input/InputTextAreaControl';
import FooterGenerate from '@/components/footer/FooterGenerate';
import Result from '@/components/site/generate/Result';
import FieldGrid from '@/components/site/schema-to-yup/FieldGrid';
import { generateYupSchema } from '@/function/schemaToYup/yupGenerateFormJson.js';
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
WHERE TABLE_SCHEMA='dbo'
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
        const value = generateYupSchema(JSON.parse(values.json));
        const fields = Object.entries(value)?.map(([key, val]) => {
            return {
                key,
                val,
            };
        });
        setValue('fields', fields);
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
                <Text strong>Step 1:</Text> Select table schema to XML file
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
                    <span style={{ color: 'lightblue', textDecoration: 'underline' }}>here</span>
                </Popover>
                <br />
                <Text strong>Step 2:</Text> Convert schema attributes to xml element
                <br />
                <a target={'_blank'} href="http://xsltfiddle.liberty-development.net/jyH9rLX">
                    http://xsltfiddle.liberty-development.net/jyH9rLX
                </a>
                <br />
                <Text strong>Step 3:</Text> Convert xml element to json.
                <br />
                <a target={'_blank'} href=" https://codebeautify.org/xmltojson">
                    https://codebeautify.org/xmltojson
                </a>
                <br />
                <Text strong>Step 4:</Text> Use this form for generate to yup schema.
            </Text>
            <Row gutter={[24, 24]}>
                <Col md={12} sm={24} xs={24}>
                    <Form layout="vertical">
                        <FormProvider {...formMethod}>
                            <InputTextAreaControl name="json" label="Json" childProps={{ style: { height: '200px' } }} />
                            <Button onClick={handleSubmit(onGetKeyFormJson, (error) => console.log(error))}> Get Keys</Button>
                            <FieldGrid name="fields" />
                        </FormProvider>
                    </Form>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Result name={watch('key')} config={resultArr} data={result} fileType="ts" />
                </Col>
            </Row>

            <FooterGenerate callback={handleSubmit(onGenerate, (error) => console.log(error))} />
        </>
    );
}

export default Generate;
