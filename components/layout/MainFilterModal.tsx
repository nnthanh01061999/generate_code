import { withModalHanlderProps } from '@/interfaces';
import { ClearOutlined, SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren } from 'react';
import { Typography } from 'antd';
import { COLOR_BLUE } from '@/data';
const { Text } = Typography;
export interface IMainFilterModalProps extends withModalHanlderProps, PropsWithChildren {
    onFilter: () => void;
    onRefresh?: () => void;
}

function MainFilterModal(props: IMainFilterModalProps) {
    const { onClose, children, onFilter, onRefresh } = props;

    const tC = useTranslations('Common');

    return (
        <Modal
            className="main-modal"
            title={tC('filter.label')}
            open={true}
            maskClosable={false}
            onCancel={onClose}
            footer={[
                onRefresh ? (
                    <Button size="middle" icon={<ClearOutlined />} style={{ float: 'left' }} key="refresh" onClick={onRefresh}>
                        {tC('filter.action.refresh')}
                    </Button>
                ) : null,
                onClose ? (
                    <Button size="middle" icon={<CloseOutlined />} key="back" onClick={onClose}>
                        {tC('filter.action.close')}
                    </Button>
                ) : null,
                onFilter ? (
                    <Button size="middle" icon={<SearchOutlined style={{ color: COLOR_BLUE }} />} key="submit" onClick={onFilter}>
                        <Text style={{ fontSize: 14, color: COLOR_BLUE }}>{tC('filter.action.submit')}</Text>
                    </Button>
                ) : undefined,
            ]}
        >
            {children}
        </Modal>
    );
}

export default MainFilterModal;
