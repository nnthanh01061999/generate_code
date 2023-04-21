import { COLOR_BLUE } from '@/data';
import { TAction } from '@/interfaces';
import { CloseOutlined, EditOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, ModalProps, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren } from 'react';

const { Text } = Typography;

export interface IMainFormModal<T> extends PropsWithChildren, ModalProps {
    action: TAction;
    loading: boolean;
    title?: string;
    wide?: boolean;
    onEditWhenView?: () => void;
    onCreateWhenView?: () => void;
    onOk: () => void;
    onClose?: () => void;
}

function MainFormModal<T>(props: IMainFormModal<T>) {
    const { children, action, loading, title = '', wide = false, onCreateWhenView, onEditWhenView, onOk, onClose, ...modalProps } = props;

    const tC = useTranslations('Common');

    return (
        <Modal
            className={`main-modal${wide ? ' main-modal--wide' : ''}`}
            title={tC(`modal.${action}`, { data: title })}
            open={true}
            maskClosable={false}
            onCancel={onClose}
            footer={[
                onClose ? (
                    <Button size="middle" icon={<CloseOutlined />} key="back" onClick={onClose}>
                        {tC('filter.action.close')}
                    </Button>
                ) : null,
                action === 'view' && onCreateWhenView ? (
                    <Button loading={loading} size="middle" icon={<PlusOutlined style={{ color: COLOR_BLUE }} />} key="create" onClick={onCreateWhenView}>
                        <Text style={{ fontSize: 14, color: COLOR_BLUE }}>{tC('filter.action.create')}</Text>
                    </Button>
                ) : null,
                action === 'view' && onEditWhenView ? (
                    <Button loading={loading} size="middle" icon={<EditOutlined style={{ color: COLOR_BLUE }} />} key="update" onClick={onEditWhenView}>
                        <Text style={{ fontSize: 14, color: COLOR_BLUE }}>{tC('filter.action.update')}</Text>
                    </Button>
                ) : null,
                action !== 'view' && onOk ? (
                    <Button loading={loading} size="middle" icon={<SaveOutlined style={{ color: COLOR_BLUE }} />} key="save" onClick={onOk}>
                        <Text style={{ fontSize: 14, color: COLOR_BLUE }}>{tC('filter.action.save')}</Text>
                    </Button>
                ) : null,
            ]}
            {...modalProps}
        >
            {children}
        </Modal>
    );
}

export default MainFormModal;
