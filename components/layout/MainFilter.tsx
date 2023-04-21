import DropOption from '@/components/shared/DropOption';
import { FILTER_MODAL } from '@/data';
import { withModalHandler } from '@/HOC/withModalHandler';
import { IDropdown } from '@/interfaces';
import { useDeviceMobile } from '@/store/reducer/device/deviceHook';
import { useModalHandle, usePageProcess } from '@/utils';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Row, Typography } from 'antd';
import dynamic from 'next/dynamic';
import React, { Fragment, PropsWithChildren } from 'react';
import MenuOption from '@/components/shared/MenuOption';
import { useTranslations } from 'next-intl';

const { Text } = Typography;

const MainFilterModal = dynamic(() => import('@/components/layout/MainFilterModal'));

const MainFilterModalWithHandler = withModalHandler(MainFilterModal, FILTER_MODAL);

export type IMainFilterLayout = 'vertical' | 'horizontal';
export interface IMainFilterProps extends PropsWithChildren {
    onFilter?: () => void;
    onRefresh?: () => void;
    menuOptions?: IDropdown[];
    loading: boolean;
    filterLayout?: IMainFilterLayout;
}

function MainFilter(props: IMainFilterProps) {
    const { loading, children, menuOptions = [], filterLayout = 'vertical', onFilter, onRefresh } = props;
    const pageProcess = usePageProcess();
    const { openModal } = useModalHandle();
    const tC = useTranslations('Common');
    const isMobile = useDeviceMobile();

    const onOpenFilterPanel = () => {
        openModal(FILTER_MODAL);
    };

    return (
        <Fragment>
            <Row align="middle" justify="end">
                {menuOptions.length > 0 ? (
                    isMobile ? (
                        <DropOption menuOptions={menuOptions} />
                    ) : (
                        <MenuOption
                            menuProps={{
                                disabled: pageProcess || loading,
                                selectable: false,
                                mode: 'horizontal',
                                style: { maxWidth: 'calc(100% - 80px)', width: '1000px', justifyContent: 'flex-end' },
                            }}
                            menuOptions={menuOptions}
                        />
                    )
                ) : (
                    <div></div>
                )}
                {onFilter ? (
                    <Button size="small" disabled={pageProcess} type="ghost" icon={<SearchOutlined style={{ fontSize: 11 }} />} onClick={onOpenFilterPanel}>
                        <Text>{tC('filter.action.filter')}</Text>
                    </Button>
                ) : null}
            </Row>
            {onFilter ? (
                <MainFilterModalWithHandler onFilter={onFilter} onRefresh={onRefresh}>
                    <Form layout={filterLayout}>
                        <Row gutter={[0, 0]}>{children}</Row>
                    </Form>
                </MainFilterModalWithHandler>
            ) : null}
        </Fragment>
    );
}

export default MainFilter;
