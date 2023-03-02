import React, { Fragment } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export interface IBooleanIconProps {
    value: boolean;
    showFalse?: boolean;
}

function BooleanIcon(props: IBooleanIconProps) {
    const { value, showFalse = false } = props;
    return <Fragment>{value ? <CheckOutlined /> : showFalse ? <CloseOutlined /> : null}</Fragment>;
}

export default BooleanIcon;
