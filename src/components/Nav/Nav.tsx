import styles from './Nav.module.css';
import { DataContext } from '../../App';
import { useContext } from 'react';
import cn from 'classnames';

const Nav = () => {
    const { dataObject, setDataObject } = useContext(DataContext);

    const change = (id: string) => {
        setDataObject({
            ...dataObject,
            activeCategory: id,
        });
    };

    const elements = dataObject.categories.map(item => {
        const activeClass = item._id === dataObject.activeCategory ? styles.linkActive : null;

        return (
            <a
                key={item._id}
                className={cn(styles.link, activeClass)}
                onClick={() => change(item._id)}
            >
                {item.title}
            </a>
        );
    });
    return (
        <nav className={styles.nav}>
            {elements}
        </nav>
    )
};

export default Nav;