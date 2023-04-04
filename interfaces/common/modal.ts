import { ModalFuncProps } from 'antd';
import { TAction } from '@/interfaces';

export interface withModalHanlderProps {
    onClose?: () => void;
    onCloseCallback?: () => void;
    confirmProps?: ModalFuncProps;
    action?: TAction;
}
