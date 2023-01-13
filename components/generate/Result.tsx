import { copyTextToClipboard } from '@/utils';
import { Button, Col, Input, Row, Space, Typography, Form } from 'antd';
import { startCase } from 'lodash';
import { useTranslations } from 'next-intl';
import React from 'react';
const { Title } = Typography;
const { TextArea } = Input;

interface Props {
    config: { key: string }[];
    data: any;
}

function Result(props: Props) {
    const { config, data } = props;

    const t = useTranslations('Generate');

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
                                    <Title level={3}>{startCase(item.key)} </Title>
                                    <Button onClick={() => copyTextToClipboard(item.key)}>{t('copy')}</Button>
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
