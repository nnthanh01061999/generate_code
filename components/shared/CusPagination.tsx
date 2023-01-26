import { Pagination, PaginationProps, Space, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
const { Text } = Typography;

export interface ICusPaginationProps extends PaginationProps {
    page: number;
    limit?: number;
    total?: number;
    onChange: (page: number, size?: number) => void;
}

function CusPagination(props: ICusPaginationProps) {
    const { page, limit = 0, total = 0, onChange } = props;
    const tC = useTranslations('Common');

    return (
        <Space style={{ width: '100%' }}>
            <Text>
                {tC('total')}: {total}
            </Text>
            <Pagination defaultCurrent={page} pageSize={limit} total={total} onChange={onChange} />
        </Space>
    );
}

export default CusPagination;
