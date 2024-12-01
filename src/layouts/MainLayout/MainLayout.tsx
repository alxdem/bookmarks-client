import { ILayout } from '../../types/common';
import styles from './MainLayout.module.css';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = ({ children }: ILayout) => {
    return (
        <div className={styles.main}>
            <Sidebar className={styles.sidebar} />
            <section className={styles.inner}>
                {children}
            </section>
        </div>
    );
};

export default MainLayout;