import { DROPDOWN_OPTIONS } from '@/data';
import { IDropdown } from '@/interfaces';
import { usePageProcess } from '@/utils';
import { Menu } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

interface ITableOperationProps {
    menuOptions: IDropdown[];
    buttonColor?: boolean;
    disabled?: boolean;
}

const TableOperation: React.FC<ITableOperationProps> = ({ menuOptions, disabled, buttonColor = false }) => {
    const loadingPage = usePageProcess();
    const tC = useTranslations('Common');

    const actionById = useMemo(() => menuOptions.reduce((prev, cur) => ({ ...prev, [cur.id]: cur.onClick }), {}), [menuOptions]);

    const generateMenus = (data: IDropdown[]) => {
        return data.map((item) => ({
            key: item.id,
            label: null,
            icon: item.icon,
            type: item.type,
            disabled: item.disabled,
        }));
    };

    const menuOptionsFormat = (menuOptions: IDropdown[]) => {
        return menuOptions?.map((item) => {
            const option = DROPDOWN_OPTIONS?.[item.id as keyof typeof DROPDOWN_OPTIONS];
            return {
                id: item.id,
                name: item.name || tC(option.name),
                code: item.code,
                icon: item.icon || (buttonColor ? option.iconColor : option.icon),
                type: item.type || option?.type,
                onClick: item.onClick,
                disabled: item.disabled,
            };
        }) as IDropdown[];
    };

    const onClickMenu = (e: any) => {
        const key = e.key;
        const onClick: Function = actionById?.[key as keyof typeof actionById];
        if (onClick instanceof Function) {
            onClick();
        }
    };

    return (
        <Menu className="table-operation-menu" mode="horizontal" selectable={false} items={generateMenus(menuOptionsFormat(menuOptions))} onClick={onClickMenu} disabled={disabled || loadingPage} />
    );
};

export default TableOperation;
