import { useContext } from 'react';
import Nav from '@components/Nav/Nav';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import styles from '@layouts/Sidebar/Sidebar.module.css';
import { SidebarProps } from '@layouts/Sidebar/Sidebar.props';
import cn from 'classnames';
import Button from '@/components/Button/Button';

const Sidebar = ({ className }: SidebarProps) => {
    const { setToken } = useContext(DataContext) || {};
    const { setModalOpen } = useContext(ServiceContext);

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
            <Nav className={styles.nav} />
            <Button
                className={styles.buttonCreate}
                size='sm'
                onClick={() => setModalOpen(true, 'category')}
            >
                Создать категорию
            </Button>
            <Button
                className={styles.buttonExit}
                size='sm'
                onClick={exit}
                color='secondary'
            >
                Выйти
            </Button>
        </aside>
    );
};

export default Sidebar;