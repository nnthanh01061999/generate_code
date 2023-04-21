import { numberFormat } from '@/utils';
import { Typography } from 'antd';
import { isNumber } from 'lodash';
import React from 'react';
const { Text } = Typography;

export interface INumberFormatProps {
    value: any;
}

function NumberFormat(props: INumberFormatProps) {
    const { value } = props;
    return <Text>{isNumber(value) ? numberFormat(value) : null}</Text>;
}

export default NumberFormat;
