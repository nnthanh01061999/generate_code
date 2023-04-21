import { IOption } from '@/interfaces';
import { Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
const { Text } = Typography;

export interface IOptionNameProps {
    value: number;
    messagePath: string;
    options: IOption<number>[];
}

function OptionName(props: IOptionNameProps) {
    const { value, messagePath, options } = props;

    const tC = useTranslations(messagePath);

    const label = useMemo(() => {
        const val = options?.find((item) => item.value === value)?.label;
        return val ? tC(`${val}`) : '';
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, options]);

    return <Text>{label}</Text>;
}

export default OptionName;
