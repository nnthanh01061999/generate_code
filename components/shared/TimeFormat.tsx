import React from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { DATE_FORMAT_LONG } from '@/data';
const { Text } = Typography;

export interface ITimeFormatProps {
    value: number;
}

function TimeFormat(props: ITimeFormatProps) {
    const { value } = props;
    return <Text>{value ? dayjs(value).local().format(DATE_FORMAT_LONG) : null}</Text>;
}

export default TimeFormat;
