import { ModalContext } from '@/context';
import { withModalHanlderProps } from '@/interfaces';
import { useModalHandle } from '@/utils';
import { useContext } from 'react';

export const withModalHandler = <T extends withModalHanlderProps = withModalHanlderProps>(Modal: React.ComponentType<T>, name: string) => {
    return (props: Omit<T, 'onClose'>) => {
        const { onCloseCallBack } = props;
        const {
            data: { openedModals },
        } = useContext(ModalContext);

        const { closeModal } = useModalHandle();

        const handleClose = () => {
            closeModal(name);
            if (onCloseCallBack instanceof Function) onCloseCallBack();
        };

        return openedModals.includes(name) ? <Modal {...(props as T)} onClose={handleClose} /> : null;
    };
};
