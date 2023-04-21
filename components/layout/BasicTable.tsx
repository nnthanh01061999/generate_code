import CustomTable, { ICustomTableProps } from '@/components/shared/CustomTable';
import { IColumnType } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface IBasicTableProps<T> extends ICustomTableProps {
    extendsColumns?: IColumnType<T>[];
}

function BasicTable<T>(props: IBasicTableProps<T>) {
    const { extendsColumns = [], ...tableProps } = props;
    const t = useTranslations('Common.table.columns');

    const columns: IColumnType<T>[] = [
        {
            title: t('code'),
            dataIndex: 'code',
            key: 'code',
            align: 'left',
            width: 200,
        },
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: 200,
        },
        ...extendsColumns,
    ];

    return <CustomTable {...tableProps} bordered columns={columns} rowKey={(record) => record.id} autoResize />;
}

export default BasicTable;
