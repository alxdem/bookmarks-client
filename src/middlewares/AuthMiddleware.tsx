import { FC, PropsWithChildren } from 'react';

const AuthMiddleware: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>{children}</>
    );
};

export default AuthMiddleware;