import { ModalContext } from '@/context';
import { withModalHanlderProps } from '@/interfaces';
import { useConfirmModal, useModalHandle } from '@/utils';
import { useContext, useEffect } from 'react';

export const withModalHandler = <T extends withModalHanlderProps = withModalHanlderProps>(Component: React.ComponentType<T>, name: string) => {
    const displayName = Component.displayName || Component.name || 'Component';

    const ComponentWithHandler = (props: Omit<T, 'onClose'>) => {
        const { onCloseCallback, confirmProps } = props;
        const {
            data: { openedModals },
            setData,
        } = useContext(ModalContext);

        const confirmModal = useConfirmModal();

        const { closeModal } = useModalHandle();

        const handleClose = () => {
            if (!!confirmProps) {
                confirmModal.confirm({
                    onOk: () => {
                        closeModal(name);
                        if (onCloseCallback instanceof Function) onCloseCallback();
                    },
                    ...confirmProps,
                });
                return;
            }
            closeModal(name);
            if (onCloseCallback instanceof Function) onCloseCallback();
        };

        useEffect(() => {
            if (onCloseCallback) {
                setData((prev) => ({
                    ...prev,
                    callback: {
                        ...prev.callback,
                        [name]: openedModals.includes(name) ? onCloseCallback : undefined,
                    },
                }));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [openedModals]);

        return openedModals.includes(name) ? <Component {...(props as T)} onClose={handleClose} /> : null;
    };

    ComponentWithHandler.displayName = `withModalHanlder(${displayName})`;

    return ComponentWithHandler;
};
