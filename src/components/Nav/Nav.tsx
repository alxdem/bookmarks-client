import styles from '@components/Nav/Nav.module.css';
import { useContext } from 'react';
import cn from 'classnames';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { NavProps } from '@components/Nav/Nav.props';
import Button from '@components/Button/Button';
import EditIcon from '@assets/svg/edit.svg?react';

const Nav = ({ className }: NavProps) => {
    const { activeCategoryId, categories, setActiveCategoryId } = useContext(DataContext) || {};
    const { setModalOpen } = useContext(ServiceContext);

    if (!activeCategoryId || !categories || !setActiveCategoryId) {
        // TODO: Add loader element
        return (
            <p>Context not found</p>
        );
    }

    const change = (id: string) => {
        setActiveCategoryId(id);
    };

    const edit = (id: string) => {
        setModalOpen('categoryUpdate', id);
    };

    const elements = categories ? categories.map(item => {
        const activeClass = item._id === activeCategoryId ? styles.linkActive : null;

        return (
            <div
                key={item._id}
                className={styles.item}
            >
                <a
                    className={cn(styles.link, activeClass)}
                    onClick={() => change(item._id)}
                >
                    {item.title}
                </a>
                <Button
                    className={cn(styles.button)}
                    onClick={() => edit(item._id)}
                    shape='square'
                >
                    <EditIcon />
                </Button>
            </div>
        );
    }) : [];

    return (
        <nav className={cn(styles.nav, className)}>
            {elements}
        </nav>
    )
};

export default Nav;