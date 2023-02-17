import { copyTextToClipboard, saveToFile } from '@/utils';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import { startCase } from 'lodash';
import { useTranslations } from 'next-intl';
import React from 'react';
const { Title } = Typography;
const { TextArea } = Input;

interface Props {
    name?: string;
    config: { key: string }[];
    data: any;
}

function Result(props: Props) {
    const { name, config, data } = props;

    const t = useTranslations('Generate');

    const onDownload = (key: string) => {
        saveToFile(`${name || ''}${startCase(key).trim().split(' ').join('')}.ts`, data?.[key]);
    };

    return (
        <Form layout="vertical">
            <Row gutter={[24, 24]}>
                {config?.map((item) => (
                    <Col key={item.key} md={24} sm={24} xs={24}>
                        <Form.Item
                            htmlFor={item.key}
                            label={
                                <Space
                                    style={{
                                        display: 'flex',
                                        width: '100vw',
                                        justifyContent: 'space-between',
                                    }}
                                    align="center"
                                >
                                    <Title level={3}>{startCase(item.key).trim().split(' ').join('')} </Title>
                                    <Space>
                                        <Button onClick={() => onDownload(item.key)} icon={<DownloadOutlined />} />
                                        <Button onClick={() => copyTextToClipboard(item.key)}>{t('copy')}</Button>
                                    </Space>
                                </Space>
                            }
                        >
                            <TextArea id={item.key} value={data?.[item.key]} style={{ height: 150 }} />
                        </Form.Item>
                    </Col>
                ))}
            </Row>
        </Form>
    );
}

export default Result;
