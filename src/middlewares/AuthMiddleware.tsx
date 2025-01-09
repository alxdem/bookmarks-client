import { FC, PropsWithChildren, useContext } from 'react';
import AuthLayout from '@layouts/AuthLayout/AuthLayout';
import { DataContext } from '@context/DataContext';

const AuthMiddleware: FC<PropsWithChildren> = ({ children }) => {
    const { token } = useContext(DataContext) || {};

    if (!token) {
        return (
            <AuthLayout />
        );
    }

    return (
        <>{children}</>
    );
};

export default AuthMiddleware;