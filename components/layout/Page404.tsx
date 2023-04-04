import React from 'react';
import MainPage from '@/components/layout/MainPage';
import { InfoCircleOutlined } from '@ant-design/icons';

function Page404() {
    return (
        <MainPage inner>
            <div className="page-404">
                <InfoCircleOutlined />
                <h3>404 Not Found</h3>
            </div>
        </MainPage>
    );
}

export default Page404;
