import CustomTable, { ICustomTableProps } from '@/components/shared/CustomTable';
import NumberFormat from '@/components/shared/NumberFormat';
import TableOperation from '@/components/shared/TableOperation';
import { DROPDOWN_DELETE, DROPDOWN_DOWNLOAD } from '@/data';
import { IColumnType, IFile } from '@/interfaces';
import { downloadFileByURL, formatBytes, getBEDownloadURL, useConfirmModal, useNotify } from '@/utils';
import { useTranslations } from 'next-intl';

export interface IFileTableProps extends ICustomTableProps {
    disabled?: boolean;
    onRemove?: (record: IFile) => void;
}

function FileTable(props: IFileTableProps) {
    const { disabled, onRemove, ...tableProps } = props;
    const tT = useTranslations('Common.table');

    const notify = useNotify();
    const confirmModal = useConfirmModal();

    const onDownload = (record: IFile) => {
        const url = getBEDownloadURL(record.download_url ?? '');
        if (url) {
            downloadFileByURL(url, notify);
        }
    };

    const columns: IColumnType<IFile>[] = [
        {
            title: tT('columns.index'),
            dataIndex: 'id',
            key: 'id',
            width: 80,
            render: (_, __, index) => <NumberFormat value={index + 1} />,
        },
        {
            title: tT('columns.file_name'),
            dataIndex: 'file_name',
            key: 'file_name',
            align: 'left',
            __exportable: true,
        },
        {
            title: tT('columns.file_size'),
            dataIndex: 'file_ext',
            key: 'file_ext',
            align: 'left',
            width: 120,
            __exportable: true,
        },
        {
            title: tT('columns.file_size'),
            dataIndex: 'size',
            key: 'size',
            align: 'right',
            width: 160,
            render: (_, record) => formatBytes(record.file_size),
            __exportable: true,
        },
        {
            __exportable: false,
            title: tT('columns.operation.label'),
            key: 'operation',
            fixed: 'right',
            width: 60,
            render: (_, record) => {
                return (
                    <TableOperation
                        buttonColor={true}
                        menuOptions={[
                            {
                                id: DROPDOWN_DOWNLOAD,
                                onClick: () => onDownload(record),
                                disabled: !record.download_url,
                            },
                            {
                                id: DROPDOWN_DELETE,
                                type: 'danger',
                                disabled: disabled,
                                onClick: () =>
                                    confirmModal.confirm({
                                        content: tT('columns.operation.delete-file-confirm'),
                                        onOk() {
                                            if (onRemove) {
                                                onRemove(record);
                                            }
                                        },
                                    }),
                            },
                        ]}
                    />
                );
            },
        },
    ];

    return <CustomTable {...tableProps} bordered columns={columns} rowKey={(record) => record.file_code} />;
}

export default FileTable;
