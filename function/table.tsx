import { TTableFormValues } from '@/interfaces';
import { snakeCase, startCase } from 'lodash';

export const generateTable = (id: string, data: TTableFormValues, setResult: (key: string, result: string) => void) => {
    const key = data.key;
    const keyStartTitle = startCase(key)?.split(' ')?.join('');
    const interface_ = data.interface;
    const actions = data.actions || [];
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
import CustomTable, { ICustomTableProps } from '@/components/shared/CustomTable';
${actions.length ? `import TableOperation from '@/components/shared/TableOperation';` : ''}${
        actions.length
            ? `\nimport { ${delete_ ? 'DROPDOWN_DELETE, ' : ''}${view ? 'DROPDOWN_VIEW, ' : ''}${update ? 'DROPDOWN_UPDATE, ' : ''}protectPaths, ${snakeCase(key).toUpperCase()}_PATH} from '@/data';`
            : ''
    }
import { IColumnType, ITableForwardRef, ${interface_} } from '@/interfaces';${delete_ ? `\nimport { useConfirmModal } from '@/utils';` : ''}
import { useTranslations } from 'next-intl';
import { forwardRef, useImperativeHandle } from 'react';

export interface I${keyStartTitle}TableProps extends ICustomTableProps {
    actionLoading: boolean;${update ? `\n    onEdit: (id: number) => void;` : ''}${delete_ ? `\n    onDelete: (id: number) => void;` : ''}${view ? `\n    onView: (id: number) => void;` : ''}
}

function Table(props: I${keyStartTitle}TableProps, ref: ITableForwardRef<${interface_}>) {
    const { ${update ? `onEdit, ` : ''}${delete_ ? `onDelete, ` : ''}${view ? `onView, ` : ''} actionLoading, ...tableProps } = props;
    const currentMenu = protectPaths?.[${snakeCase(key).toUpperCase()}_PATH];${boolean ? `const tC = useTranslations('Common');\n` : ''}
    const tT = useTranslations('Common.table');
    const t = useTranslations('${keyStartTitle}.table.columns');
${delete_ ? `\nconst confirmModal = useConfirmModal();` : ''}

    const columns: IColumnType<${interface_}>[] = [
        ${columns
            ?.map((item) => {
                return `{
            title: t('${item.key}'),
            dataIndex: '${item.key}',
            key: '${item.key}',
            ${getAlignByType(item.type)}${item.width ? `\n\t\twidth: ${item.width},` : ''}
            ${item.exportable ? '__exportable: true,' : ''}
            ${
                item.exportable && item.type === 'boolean'
                    ? `__extend: {
                true_label: tC('boolean.true'),
                false_label: tC('boolean.false'),
            },`
                    : ''
            }${item.type !== 'string' ? `\t    render: (value) => ${getRenderByType(item.type)}` : ''}
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
                   <TableOperation
                        disabled={actionLoading}
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
                            ${update ? `{ id: DROPDOWN_UPDATE, bit_index: currentMenu.action?.[DROPDOWN_UPDATE], onClick: () => onEdit(record.id)},` : ''}
                            ${
                                delete_
                                    ? `{
                                id: DROPDOWN_DELETE,
                                 bit_index: currentMenu.action?.[DROPDOWN_DELETE],
                                type: 'danger',
                                onClick: () =>
                                    confirmModal.confirm({
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

    useImperativeHandle(
        ref,
        () => ({
            getColumns: () => columns,
        }),
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <CustomTable
            {...tableProps}
            bordered
            columns={columns}
            rowKey={(record) => record.${data.rowKey}}
        />
    );
}

export default forwardRef(Table);
`;

    setResult(id, result);
};
