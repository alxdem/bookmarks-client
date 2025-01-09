import { useContext } from 'react';
import Nav from '@components/Nav/Nav';
import { DataContext } from '@context/DataContext';
import styles from '@layouts/Sidebar/Sidebar.module.css';
import { SidebarProps } from '@layouts/Sidebar/Sidebar.props';
import cn from 'classnames';

const Sidebar = ({ className }: SidebarProps) => {
    const { setToken } = useContext(DataContext) || {};

    if (!setToken) {
        throw Error('Метод setToken не найден в контексте');
    }

    const exit = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <aside className={cn(styles.sidebar, className)}>
            sidebar
            <Nav />
            <button
                onClick={exit}
            >Выйти</button>
        </aside>
    );
};

export default Sidebar;