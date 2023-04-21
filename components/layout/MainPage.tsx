import React, { PropsWithChildren } from 'react';

export interface IMainPageProps extends PropsWithChildren {
    inner: boolean;
    className?: string;
    loading?: boolean;
}

function MainPage(props: IMainPageProps) {
    const { inner, className, loading, children } = props;

    const loadingStyle = {
        height: 'calc(100vh - 184px)',
        overflow: 'hidden',
    };

    return (
        <div className={`${className || ''} ${inner ? 'contentInner' : ''}`} style={loading ? loadingStyle : undefined}>
            {children}
        </div>
    );
}

export default MainPage;
