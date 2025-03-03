import { createContext, FC, PropsWithChildren, useState } from 'react';
import { modalType } from '@t/commonTypes';

interface ServiceObjectProps {
    isModalOpen: boolean;
    modalType: modalType;
    itemId?: string;
    confirmFormText?: string;
}

const initialServiceObject: ServiceObjectProps = {
    isModalOpen: false,
    modalType: 'categoryCreate',
    confirmFormText: '',
}

interface ContextProps extends ServiceObjectProps {
    setModalOpen: (type: modalType, id?: string) => void;
    setModalClose: () => void;
    setConfirmFormText: (value: string) => void;
};

export const ServiceContext = createContext<ContextProps>({
    ...initialServiceObject,
    setModalOpen: () => { },
    setModalClose: () => { },
    setConfirmFormText: () => { },
});

export const ServiceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [serviceContext, setServiceContext] = useState<ServiceObjectProps>(initialServiceObject);

    const setModalOpen = (type: modalType, id?: string) => {
        setServiceContext(state => ({
            ...state,
            modalType: type,
            isModalOpen: true,
            itemId: id,
        }));
    };

    const setModalClose = () => {
        setServiceContext(state => ({
            ...state,
            isModalOpen: false,
        }));
    };

    const setConfirmFormText = (value: string) => {
        setServiceContext(state => ({
            ...state,
            confirmFormText: value,
        }));
    };

    return (
        <ServiceContext.Provider value={{
            ...serviceContext,
            setModalOpen,
            setModalClose,
            setConfirmFormText,
        }}>
            {children}
        </ServiceContext.Provider>
    );
};