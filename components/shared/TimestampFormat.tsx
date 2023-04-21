import React from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { DATE_FORMAT_LONG } from '@/data';
const { Text } = Typography;

export interface ITimestampFormatProps {
    value: number;
}

function TimestampFormat(props: ITimestampFormatProps) {
    const { value } = props;
    return <Text>{value ? dayjs(value).format(DATE_FORMAT_LONG) : null}</Text>;
}

export default TimestampFormat;
