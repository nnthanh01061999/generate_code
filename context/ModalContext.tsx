import React, { PropsWithChildren } from 'react';

export interface IModalConTextData {
    openedModals: string[];
    callback: {
        [key: string]: (() => void) | undefined;
    };
}

export interface IModalContextState {
    data: IModalConTextData;
    setData: React.Dispatch<React.SetStateAction<IModalConTextData>>;
}

export const ModalContext = React.createContext<IModalContextState>({ data: { openedModals: [], callback: {} }, setData: () => [] });

const ModalContextProvider = (props: PropsWithChildren) => {
    const { children } = props;
    const [data, setData] = React.useState<IModalConTextData>({
        openedModals: [],
        callback: {},
    });

    const contextData: IModalContextState = {
        data,
        setData,
    };

    return <ModalContext.Provider value={contextData}>{children}</ModalContext.Provider>;
};

export default ModalContextProvider;
