import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, UndoOutlined, SaveOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import React from 'react';

export const DROPDOWN_UPDATE = 'update';
export const DROPDOWN_DELETE = 'delete';
export const DROPDOWN_CREATE = 'create';
export const DROPDOWN_FILTER = 'filter';
export const DROPDOWN_VIEW = 'view';
export const DROPDOWN_RELOAD = 'reload';
export const DROPDOWN_UNCHECKED = 'uncheked';
export const DROPDOWN_GIANTS = 'giant';
export const DROPDOWN_EXPORT = 'export';
export const DROPDOWN_UPLOAD = 'upload';
export const DROPDOWN_DOWNLOAD = 'download';

export type TDropdown = 'update' | 'delete' | 'create' | 'filter' | 'giant' | 'export' | 'upload' | 'download';

interface IDropDownOptions {
    [key: string]: {
        name: string;
        icon: React.ReactNode;
        iconColor?: React.ReactNode;
        color?: string;
        type?: string;
    };
}

export const DROPDOWN_OPTIONS: IDropDownOptions = {
    [DROPDOWN_CREATE]: {
        name: 'filter.action.create',
        icon: <PlusOutlined />,
        iconColor: <PlusOutlined />,
    },
    [DROPDOWN_DELETE]: {
        name: 'filter.action.delete',
        icon: <DeleteOutlined style={{ fontSize: 14 }} />,
        iconColor: <DeleteOutlined style={{ fontSize: 14, color: '#ff4d4f' }} />,
        type: 'danger',
    },
    [DROPDOWN_UPDATE]: {
        name: 'filter.action.update',
        icon: <EditOutlined style={{ fontSize: 14 }} />,
        iconColor: <EditOutlined style={{ fontSize: 14, color: '#faad14' }} />,
        type: 'warning',
    },
    [DROPDOWN_VIEW]: {
        name: 'filter.action.view',
        icon: <EyeOutlined style={{ fontSize: 14 }} />,
        iconColor: <EyeOutlined style={{ fontSize: 14 }} />,
    },
    [DROPDOWN_RELOAD]: {
        name: 'filter.action.reload',
        icon: <UndoOutlined />,
        iconColor: <UndoOutlined />,
    },
    [DROPDOWN_UNCHECKED]: {
        name: 'filter.action.unchecked',
        icon: <UndoOutlined />,
        iconColor: <UndoOutlined />,
    },
    [DROPDOWN_GIANTS]: {
        name: 'filter.action.giants',
        icon: <SaveOutlined />,
        iconColor: <SaveOutlined />,
    },
    [DROPDOWN_EXPORT]: {
        name: 'filter.action.export',
        icon: <DownloadOutlined />,
        iconColor: <DownloadOutlined />,
    },
    [DROPDOWN_DOWNLOAD]: {
        name: 'filter.action.download',
        icon: <DownloadOutlined />,
        iconColor: <DownloadOutlined />,
    },
    [DROPDOWN_UPLOAD]: {
        name: 'filter.action.download',
        icon: <UploadOutlined />,
        iconColor: <UploadOutlined />,
    },
};
