import { locales } from '@/data';
import { Divider, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface ILocaleChangeProps {
    disabled: boolean;
}

function LocaleChange(props: ILocaleChangeProps) {
    const { disabled } = props;

    const router = useRouter();

    return (
        <Space split={<Divider type="vertical" />}>
            {Object.values(locales).map((locale) => (
                <Link aria-disabled={disabled} key={locale.key} href={router.route} locale={locale.key}>
                    {locale.label}
                </Link>
            ))}
        </Space>
    );
}

export default LocaleChange;
