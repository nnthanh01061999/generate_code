import NextLink from '@/components/shared/NextLink';
import { SiteData } from '@/data';
import { getServerSideProps } from '@/pages';
import { Col, Row, Typography, Card } from 'antd';
import { InferGetServerSidePropsType } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React from 'react';
const { Title, Text } = Typography;

function Home({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const t = useTranslations('Home');
    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>

            <Title level={1}>{t('title')}</Title>
            <Text> {isConnected ? 'Connected' : 'not Conected'}</Text>
            <Row gutter={[12, 12]}>
                {SiteData?.map((item, index) => (
                    <Col key={index} md={8} sm={12} xs={24}>
                        <Card title={t(`data.${item.title}`)} extra={<NextLink href={item.href}>{t('link')}</NextLink>}>
                            {t(`data.${item.description}`)}
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Home;
