import { DROPDOWN_OPTIONS } from '@/data';
import { IDropdown } from '@/interfaces';
import { Menu, MenuProps } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

interface IMenuOptionProps {
    menuOptions: IDropdown[];
    menuProps?: MenuProps;
}

const MenuOption: React.FC<IMenuOptionProps> = ({ menuOptions, menuProps }) => {
    const tC = useTranslations('Common');

    const router = useRouter();

    const generateMenus = (data: IDropdown[]) => {
        return data.map((item) => ({
            key: item.id,
            label: item.name,
            icon: item.icon,
            disabled: item.disabled,
        }));
    };

    const menuOptionsFormat = (menuOptions: IDropdown[]) => {
        return menuOptions?.map((item) => {
            return {
                id: item.id,
                name: item.name || tC(DROPDOWN_OPTIONS?.[item.id as keyof typeof DROPDOWN_OPTIONS].name),
                code: item.code,
                icon: item.icon || DROPDOWN_OPTIONS?.[item.id as keyof typeof DROPDOWN_OPTIONS].icon,
                onClick: item.onClick,
                disabled: item.disabled,
            };
        }) as IDropdown[];
    };

    const onClickMenu = (e: any) => {
        const key = e.key;
        console.log('🚀 >>> key:', key);
    };

    return <Menu className="main-menu-option" items={generateMenus(menuOptionsFormat(menuOptions))} onClick={onClickMenu} {...menuProps} />;
};

export default MenuOption;
