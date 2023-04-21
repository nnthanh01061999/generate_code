import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import SelectControl, { ISelectControlProps } from '@/components/control/select/SelectControl';

function BooleanSelect(props: ISelectControlProps) {
    const tC = useTranslations('Common');

    const options = useMemo(() => {
        return [
            {
                value: 'all',
                label: tC('dropdown.boolean.all'),
            },
            {
                value: 'true',
                label: tC('dropdown.boolean.true'),
            },
            {
                value: 'false',
                label: tC('dropdown.boolean.false'),
            },
        ];
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SelectControl {...props} childProps={{ ...props.childProps, options: options }} />;
}

export default BooleanSelect;
