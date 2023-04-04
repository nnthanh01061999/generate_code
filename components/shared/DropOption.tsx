import { DROPDOWN_OPTIONS } from '@/data';
import { IDropdown } from '@/interfaces';
import { usePageProcess } from '@/utils';
import { BarsOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, DropDownProps, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { CSSProperties, useMemo } from 'react';

const { Text } = Typography;
interface IDropOptionProps {
    menuOptions: IDropdown[];
    buttonStyle?: CSSProperties;
    dropdownProps?: DropDownProps;
    buttonColor?: boolean;
}

const DropOption: React.FC<IDropOptionProps> = ({ menuOptions, buttonStyle, dropdownProps, buttonColor = false }) => {
    const tC = useTranslations('Common');
    const disabled = dropdownProps ? dropdownProps?.disabled : false;
    const loadingPage = usePageProcess();

    const router = useRouter();

    const actionById = useMemo(() => menuOptions.reduce((prev, cur) => ({ ...prev, [cur.id]: cur.onClick }), {}), [menuOptions]);

    const generateMenus = (data: IDropdown[]) => {
        return data.map((item) => ({
            key: item.id,
            label: buttonColor ? <Text type={item.type}>{item.name}</Text> : item.name,
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
        <Dropdown menu={{ items: generateMenus(menuOptionsFormat(menuOptions)), onClick: onClickMenu }} {...dropdownProps} disabled={disabled || loadingPage}>
            <Button size="middle" style={{ border: 'none', ...buttonStyle }}>
                <BarsOutlined style={{ marginRight: 2 }} />
                <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default DropOption;
