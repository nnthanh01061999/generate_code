import { TReducerFormValues, TTableFormValues } from '@/interfaces';
import { upperCase, startCase } from 'lodash';

export const formatKeySnake = (key: string, suffix: string): string => upperCase(key) + '_' + upperCase(suffix).trim().split(' ').join('_');

export const formatKeyTitleCase = (key: string, suffix: string): string => startCase(key) + startCase(suffix).trim().split(' ').join('');

export const generateTable = (data: TTableFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const interface_ = data.interface;
    const actions = data.actions;
    const columns = data.columns;
    const delete_ = actions.includes('delete');
    const update = actions.includes('update');
    const view = actions.includes('view');

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

    const result = `${boolean ? `import BooleanIcon from '@/components/shared/BooleanIcon';` : ''}${number ? `\nimport NumberFormat from '@/components/shared/NumberFormat';` : ''}${
        date ? `\nimport TimeFormat from '@/components/shared/TimeFormat';` : ''
    }
import CustomTable, { ICustomTableProps } from '@/components/shared/CustomTable';${actions.length ? `\nimport DropOption from '@/components/shared/DropOption';` : ''}${
        actions.length ? `\nimport { ${delete_ ? 'DROPDOWN_DELETE, ' : ''}${view ? 'DROPDOWN_VIEW, ' : ''}${update ? 'DROPDOWN_UPDATE, ' : ''} } from '@/data';` : ''
    }
import { ${interface_} } from '@/interfaces';${delete_ ? `\nimport { Modal } from 'antd';` : ''}
import { ColumnType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import React from 'react';${delete_ ? `\n\nconst { confirm } = Modal;` : ''}

export interface I${startCase(key)}TableProps extends ICustomTableProps {
    actionLoading: boolean;${update ? `\n    onEdit: (id: number) => void;` : ''}${delete_ ? `\n    onDelete: (id: number) => void;` : ''}${view ? `\n    onView: (id: number) => void;` : ''}
}

function Table(props: I${startCase(key)}TableProps) {
    const { ${update ? `onEdit, ` : ''}${delete_ ? `onDelete, ` : ''}${view ? `onView, ` : ''} actionLoading, ...tableProps } = props;
    const tT = useTranslations('Common.table');
    const t = useTranslations('${startCase(key)}.table.columns');

    const columns: ColumnType<${interface_}>[] = [
        ${columns
            ?.map((item) => {
                return `{
            title: t('${item.key}'),
            dataIndex: '${item.key}',
            key: '${item.key}',
            ${getAlignByType(item.type)}${item.width ? `\n\t    width: ${item.width},` : ''}${item.type !== 'string' ? `\n\t    render: (value) => ${getRenderByType(item.type)}` : ''}
        },\n\t`;
            })
            .join('')}${
        actions.length
            ? `{
            title: tT('columns.operation.label'),
            key: 'operation',
            fixed: 'right',
            width: 90,
            render: (_, record) => {
                return (
                    <DropOption
                        dropdownProps={{ disabled: actionLoading }}
                        buttonColor={true}
                        menuOptions={[
                            ${
                                view
                                    ? `{
                                id: DROPDOWN_VIEW,
                                onClick: () => onView(record.id),
                            },`
                                    : ''
                            }
                            ${update ? `{ id: DROPDOWN_UPDATE, onClick: () => onEdit(record.id)},` : ''}
                            ${
                                delete_
                                    ? `{
                                id: DROPDOWN_DELETE,
                                type: 'danger',
                                onClick: () =>
                                    confirm({
                                        title: tT('columns.operation.delete-confirm'),
                                        onOk() {
                                            onDelete(record.id);
                                        },
                                    }),
                            },`
                                    : ''
                            }
                        ]}
                    />
                );
            },
        },`
            : ''
    }
    ];

    return (
        <CustomTable
            {...tableProps}
            pagination={{
                ...tableProps.pagination,
                showTotal: (total) => tT('pagination.show-total', { total }),
            }}
            bordered
            columns={columns}
            rowKey={(record) => record.${data.rowKey}}
        />
    );
}

export default Table;
`;

    setResult('tables', result);
};
