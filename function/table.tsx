import { TTableFormValues } from '@/interfaces';
import { startCase } from 'lodash';

export const generateTable = (id: string, data: TTableFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const keyStartTitle = startCase(key)?.split(' ')?.join('');
    const interface_ = data.interface;
    const actions = data.actions || [];
    const columns = data.columns;
    const delete_ = actions.includes('delete');
    const update = actions.includes('update');

    const boolean = columns.find((item) => item.type === 'boolean');
    const number = columns.find((item) => item.type === 'number');
    const date = columns.find((item) => item.type === 'date');

    const getRenderByType = (type?: string) => {
        if (type === 'boolean') {
            return `<BooleanIcon value={value} />`;
        }
        if (type === 'number') {
            return `<NumberFormat value={value} />`;
        }
        if (type === 'date') {
            return `<TimeFormat value={value} />`;
        }
        return '';
    };

    const getAlignByType = (type?: string) => {
        if (type === 'boolean') {
            return `align: 'center',`;
        }
        if (type === 'number') {
            return `align: 'right',`;
        }
        if (type === 'date') {
            return `align: 'center',`;
        }
        if (type === 'string') {
            return `align: 'left',`;
        }
        return '';
    };

    const result = `
${boolean ? `import BooleanIcon from '@/components/shared/BooleanIcon';` : ''}
${number ? `import NumberFormat from '@/components/shared/NumberFormat';` : ''}
${date ? `import TimeFormat from '@/components/shared/TimeFormat';` : ''}
${actions.length ? `import TableOperation from '@/components/shared/TableOperation';` : ''}
${delete_ ? `import { useConfirmModal } from '@/hooks/use-confirm';` : ''}
import { ${interface_} } from '@/types';
import { Table as AntTable, TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export interface I${keyStartTitle}TableProps extends TableProps {
    actionLoading: boolean;${update ? `\nonUpdate: (id: string | number) => void;` : ''}${delete_ ? `\nonDelete: (id: string | number) => void;` : ''}
}

function Table (props: I${keyStartTitle}TableProps) {
    const { actionLoading,${update ? `onUpdate, ` : ''}${delete_ ? `onDelete, ` : ''} ...tableProps } = props;
    ${boolean ? `const tC = useTranslations('Common');` : ''}
   ${delete_ ? `const tT = useTranslations('Common.table');` : ''}
    const t = useTranslations('${keyStartTitle}.table.columns');
    ${delete_ ? `const confirmModal = useConfirmModal();` : ''}

    const columns: ColumnType<${interface_}>[] = useMemo(() =>[
        ${columns
            ?.map((item) => {
                return `{
            key: '${item.key}',
            title: t('${item.key}'),
            dataIndex: '${item.key}',
            ${getAlignByType(item.type)}
            ${item.width ? `width: ${item.width},` : ''}
            ${item.type !== 'string' ? `render: (value) => ${getRenderByType(item.type)}` : ''}
        },`;
            })
            .join('')}
            ${
                actions.length
                    ? `{
                title: tT('columns.operation.label'),
                key: 'operation',
                fixed: 'right',
                width: 90,
                render: (_, record) => {
                    return (
                        <TableOperation
                            ${update ? `onUpdate={() => onUpdate(record.id)}` : ''}
                            ${
                                delete_
                                    ? `onDelete={() =>
                                confirmModal.confirm({
                                    content: tT('columns.operation.delete-confirm'),
                                    onOk() {
                                        onDelete(record.id);
                                    },
                                })
                            }`
                                    : ''
                            }
                        />
                    );
                },
            },`
                    : ''
            }
    ],
    [${delete_ ? 'confirmModal, onDelete, ' : ''}${update ? 'onUpdate, ' : ''}t,${delete_ ? ' tT' : ''}],
    );

    return (
        <AntTable {...tableProps} columns={columns} bordered rowKey={(record) => record.${data.rowKey}} />
    )
}

export default Table;
`;

    setResult(id, result);
};
