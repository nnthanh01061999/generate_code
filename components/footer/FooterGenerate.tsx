import { Button } from 'antd';
import { Layout } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
const { Footer } = Layout;

interface Props {
    callback: () => void;
}

function FooterGenerate(props: Props) {
    const { callback } = props;
    const t = useTranslations('Generate');

    return (
        <Footer
            style={{
                position: 'fixed',
                bottom: 0,
                zIndex: 10,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Button onClick={callback}>{t('title')}</Button>
        </Footer>
    );
}

export default FooterGenerate;
