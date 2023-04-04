import { locales } from '@/data';
import { ICusLocale, MenuItem } from '@/interfaces';
import { Avatar, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NextImage from '@/components/shared/NextImage';

export interface ILocaleSwitcherProps {
    disabled: boolean;
}

export default function LocaleSwitcher(props: ILocaleSwitcherProps) {
    const { disabled } = props;
    const router = useRouter();
    const { locale } = router;
    const [localeArr] = useState(() => Object.values(locales));

    const getItem = (key: React.Key, label: React.ReactNode, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    };

    const currentMenu = () => {
        const currentLocale = locales?.[locale as keyof typeof locales];
        return [
            getItem(
                '1',
                <Avatar style={{ marginRight: 8 }} icon={<NextImage style={{ marginTop: '-3px' }} placeholder={undefined} width={30} alt={'flag'} src={currentLocale.flag} />} />,
                undefined,
                generateMenus(localeArr),
            ),
        ];
    };

    const generateMenus = (data: ICusLocale[]) => {
        return data.map((item) => {
            return getItem(
                item.key,
                <Link key={item.key} href={router.route} locale={item.key}>
                    {item.label}
                </Link>,
                <Avatar style={{ marginRight: 8 }} src={<NextImage placeholder={undefined} width={20} alt={item.label} src={item.flag} />} />,
            );
        });
    };

    return <Menu disabled={disabled} key="language" style={{ minWidth: 100 }} selectedKeys={[locale || 'en']} mode="horizontal" items={currentMenu()} />;
}
