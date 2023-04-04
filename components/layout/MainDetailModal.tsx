import { Button, Modal, ModalProps } from 'antd';
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren } from 'react';
import { CloseOutlined } from '@ant-design/icons';

export interface IMainDetailModalProps extends PropsWithChildren, ModalProps {
    title: string;
    wide?: boolean;
    onClose?: () => void;
}

function MainDetailModal(props: IMainDetailModalProps) {
    const { children, title, wide, onClose, ...modalProps } = props;

    const tC = useTranslations('Common');

    return (
        <Modal
            className={`main-modal${wide ? ' main-modal--wide' : ''}`}
            title={tC('modal.detail', { data: title })}
            open={true}
            maskClosable={true}
            onCancel={onClose}
            footer={[
                onClose ? (
                    <Button size="middle" icon={<CloseOutlined />} key="back" onClick={onClose}>
                        {tC('filter.action.close')}
                    </Button>
                ) : null,
            ]}
            {...modalProps}
        >
            {children}
        </Modal>
    );
}

export default MainDetailModal;
