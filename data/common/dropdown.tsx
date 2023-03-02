import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, UndoOutlined, SaveOutlined } from '@ant-design/icons';
import React from 'react';

export const DROPDOWN_UPDATE = 'update';
export const DROPDOWN_DELETE = 'delete';
export const DROPDOWN_CREATE = 'create';
export const DROPDOWN_FILTER = 'filter';
export const DROPDOWN_VIEW = 'view';
export const DROPDOWN_RELOAD = 'reload';
export const DROPDOWN_UNCHECKED = 'uncheked';
export const DROPDOWN_GIANTS = 'giant';

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
        icon: <DeleteOutlined />,
        iconColor: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
        type: 'danger',
    },
    [DROPDOWN_UPDATE]: {
        name: 'filter.action.update',
        icon: <EditOutlined />,
        iconColor: <EditOutlined style={{ color: '#faad14' }} />,
        type: 'warning',
    },
    [DROPDOWN_VIEW]: {
        name: 'filter.action.view',
        icon: <EyeOutlined />,
        iconColor: <EyeOutlined />,
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
};
