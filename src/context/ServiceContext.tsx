import { createContext, FC, PropsWithChildren, useState } from 'react';

type modalType = 'category' | 'bookmark';

interface ServiceObjectProps {
    isModalOpen: boolean;
    modalType: modalType;
}

const initialServiceObject: ServiceObjectProps = {
    isModalOpen: false,
    modalType: 'category',
}

interface ContextProps extends ServiceObjectProps {
    setModalOpen: (value: boolean, type: modalType) => void;
    setModalClose: () => void;
};

export const ServiceContext = createContext<ContextProps>({
    ...initialServiceObject,
    setModalOpen: () => { },
    setModalClose: () => { }
});

export const ServiceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [serviceContext, setServiceContext] = useState<ServiceObjectProps>(initialServiceObject);

    const setModalOpen = (value: boolean, type: modalType) => {
        setServiceContext(state => ({
            ...state,
            modalType: type,
            isModalOpen: value,
        }));
    };

    const setModalClose = () => {
        setServiceContext(state => ({
            ...state,
            isModalOpen: false,
        }));
    };

    return (
        <ServiceContext.Provider value={{
            ...serviceContext,
            setModalOpen,
            setModalClose,
        }}>
            {children}
        </ServiceContext.Provider>
    );
};