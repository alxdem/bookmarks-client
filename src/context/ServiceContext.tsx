import { createContext, FC, PropsWithChildren, useState } from 'react';
import { EntityType, ModalType } from '@t/commonTypes';

interface ServiceObjectProps {
    isModalOpen: boolean;
    modalType: ModalType;
    itemId?: string;
    confirmFormText?: string;
    currentEntity?: EntityType;
}

const initialServiceObject: ServiceObjectProps = {
    isModalOpen: false,
    modalType: 'categoryCreate',
    confirmFormText: '',
}

interface ContextProps extends ServiceObjectProps {
    setModalOpen: (type: ModalType, id?: string) => void;
    setModalClose: () => void;
    setConfirmFormText: (value: string) => void;
    setCurrentEntity: (value: EntityType) => void;
};

export const ServiceContext = createContext<ContextProps>({
    ...initialServiceObject,
    setModalOpen: () => { },
    setModalClose: () => { },
    setConfirmFormText: () => { },
    setCurrentEntity: () => { },
});

export const ServiceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [serviceContext, setServiceContext] = useState<ServiceObjectProps>(initialServiceObject);

    const setModalOpen = (type: ModalType, id?: string) => {
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
            currentEntity: null,
        }));
    };

    const setConfirmFormText = (value: string) => {
        setServiceContext(state => ({
            ...state,
            confirmFormText: value,
        }));
    };

    const setCurrentEntity = (value: EntityType) => {
        setServiceContext(state => ({
            ...state,
            currentEntity: value,
        }));
    }

    return (
        <ServiceContext.Provider value={{
            ...serviceContext,
            setModalOpen,
            setModalClose,
            setConfirmFormText,
            setCurrentEntity,
        }}>
            {children}
        </ServiceContext.Provider>
    );
};