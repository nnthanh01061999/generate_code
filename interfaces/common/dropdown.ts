import React from 'react';

export interface IDropdown {
    id: string;
    name?: string;
    code?: string;
    icon?: React.ReactNode;
    onClick: (e: any) => void;
    type?: 'secondary' | 'success' | 'warning' | 'danger' | undefined;
    color?: string;
    disabled?: boolean;
    bit_index?: number;
}
