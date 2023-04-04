import Icon from '@/components/shared/Icon';
import { ISubsection, MenuItem } from '@/interfaces';
import { arrayToTree, queryAncestors } from '@/utils';
import { Menu, Tooltip, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
const { Text } = Typography;
export interface ISiderMenuProps {
    disabled: boolean;
    collapsed: boolean;
    isMobile: boolean;
    onCollapseChange: (value: boolean) => void;
    menus: ISubsection[];
    lastOpen: string[];
}

function SiderMenu(props: ISiderMenuProps) {
    const { disabled, collapsed, isMobile, onCollapseChange, menus = [], lastOpen } = props;

    const router = useRouter();
    const pathname = router.pathname;
    const [openKeys, setOpenKeys] = useState<string[]>(() => []);

    const currentMenu = menus.find((item) => `/${item.action}` === pathname);

    const menuObj = useMemo(() => menus.reduce((prev, cur) => ({ ...prev, [cur.menu_id]: cur }), {}), [menus]);

    const menuTree = arrayToTree(menus, 'menu_id', 'parent_menu_id');

    const selectedKeys = currentMenu ? queryAncestors(menus, currentMenu, 'parent_menu_id', 'menu_id').map((_) => _?.menu_id + '') : [];

    const menuProps = collapsed
        ? {}
        : {
              openKeys,
              defaultOpenKeys: selectedKeys,
          };

    const getItem = (key: React.Key, label: React.ReactNode, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    };

    const generateMenus = (data: any) => {
        return data
            ?.sort((a: any, b: any) => a?.priority - b?.priority)
            .map((item: any) => {
                if (item.children) {
                    return getItem(
                        item.menu_id,
                        <Text title={item.menu_name} className={`title-menu ${collapsed ? 'title-menu--collapse' : ''}`} style={{ paddingLeft: 8 }}>
                            {item.menu_name}
                        </Text>,
                        <Icon width={16} height={16} name={item.menu_icon} color={item.menu_color} />,
                        generateMenus(item.children),
                    );
                }
                return getItem(
                    item.menu_id,
                    <Text title={item.menu_name} className={`title-menu ${collapsed ? 'title-menu--collapse' : ''}`} style={{ paddingLeft: 8 }}>
                        {item.menu_name}
                    </Text>,
                    <Icon width={16} height={16} name={item.menu_icon} color={item.menu_color} />,
                );
            });
    };

    const onOpenChange = (openKeys: string[]) => {
        const rootSubmenuKeys = menus.filter((item) => !item.parent_menu_id).map((item: any) => item.menu_id);

        const latestOpenKey = openKeys.find((key) => openKeys.indexOf(key) === -1);

        let newOpenKeys = openKeys;
        if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
            newOpenKeys = latestOpenKey ? [latestOpenKey] : [];
        }

        setOpenKeys(newOpenKeys?.map((item) => item + ''));
    };

    const onClickMenu = (e: any) => {
        const key = e.key;
        const menu: ISubsection = menuObj?.[key as keyof typeof menuObj];

        const isBlank = e.domEvent?.metaKey || e.domEvent?.ctrlKey;

        if (isBlank) {
            window.open(`/${menu.action}`);
            return;
        }

        if (menu) {
            router.push(`/${menu.action}`);
        }
        if (isMobile) {
            onCollapseChange(true);
        }
    };

    useEffect(() => {
        if (openKeys.length === 0) {
            setOpenKeys(lastOpen);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastOpen]);

    return (
        <Menu
            disabled={disabled}
            selectable={false}
            mode="inline"
            theme="light"
            inlineIndent={12}
            onOpenChange={onOpenChange}
            selectedKeys={selectedKeys}
            onClick={onClickMenu}
            {...menuProps}
            items={generateMenus(menuTree)}
        />
    );
}

export default SiderMenu;
