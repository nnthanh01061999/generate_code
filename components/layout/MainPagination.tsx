import { useDeviceMobile } from '@/store/reducer/device/deviceHook';
import { IPaginationStates, usePageProcess } from '@/utils';
import { Pagination, PaginationProps } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface IMainPaginationProps extends PaginationProps {
    pagination: IPaginationStates;
    total?: number;
}

function MainPagination(props: IMainPaginationProps) {
    const { pagination, total = 0, ...paginationProps } = props;

    const tC = useTranslations('Common');
    const loadingPage = usePageProcess();

    const isMobile = useDeviceMobile();

    return (
        <Pagination
            className="main-pagination"
            style={{ fontSize: 12 }}
            showTotal={(total) => tC('pagination.show-total', { total })}
            size="small"
            current={pagination.page}
            pageSize={pagination.size}
            total={total}
            showSizeChanger={true}
            simple={!!isMobile}
            {...paginationProps}
            disabled={loadingPage || paginationProps.disabled}
        />
    );
}

export default MainPagination;
