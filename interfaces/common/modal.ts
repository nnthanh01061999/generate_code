import { ModalFuncProps } from 'antd';

export interface withModalHanlderProps {
    onClose?: () => void;
    onCloseCallback?: () => void;
    confirmProps?: ModalFuncProps;
}
