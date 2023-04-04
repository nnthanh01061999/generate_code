import { useDeviceMobile } from '@/store/reducer/device/deviceHook';
import { Col, Row } from 'antd';
import React from 'react';

export interface IMainFilterAndSelectedProps {
    selected?: React.ReactNode;
    filter?: React.ReactNode;
    width?: number | string;
}

function MainFilterAndSelected(props: IMainFilterAndSelectedProps) {
    const { selected, filter, width = '100%' } = props;

    const isMobile = useDeviceMobile();

    return (
        <Row justify="space-between" align={'middle'} style={{ maxWidth: width, paddingLeft: 8 }}>
            <Col style={isMobile ? { width: 220 } : { width: 400 }}>{selected}</Col>
            <Col style={isMobile ? { width: 'calc(100% - 220px)' } : { width: 'calc(100% - 400px)' }}>{filter}</Col>
        </Row>
    );
}

export default MainFilterAndSelected;
