import styles from '@components/Nav/Nav.module.css';
import { useContext } from 'react';
import cn from 'classnames';
import { DataContext } from '@context/DataContext';

const Nav = () => {
    const { activeCategory, categories, setActiveCategory } = useContext(DataContext) || {};

    if (!activeCategory || !categories || !setActiveCategory) {
        // TODO: Add loader element
        return (
            <p>Context not found</p>
        );
    }

    const change = (id: string) => {
        setActiveCategory(id);
    };

    const elements = categories ? categories.map(item => {
        const activeClass = item._id === activeCategory ? styles.linkActive : null;

        return (
            <a
                key={item._id}
                className={cn(styles.link, activeClass)}
                onClick={() => change(item._id)}
            >
                {item.title}
            </a>
        );
    }) : [];
    return (
        <nav className={styles.nav}>
            {elements}
        </nav>
    )
};

export default Nav;