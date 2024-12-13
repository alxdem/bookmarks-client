import { ILayout } from '../../types/common';
import styles from './MainLayout.module.css';
import Sidebar from '../Sidebar/Sidebar';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import useGetCategories from '../../hooks/useGetCategories';
import useGetBookmarks from '../../hooks/useGetBookmarks';

const MainLayout = ({ children }: ILayout) => {
    const userId = '673b3e623f2c79dde1aa2e4d';
    const { setActiveCategory, setCategories, setBookmarks } = useContext(DataContext) || {};
    const [categoriesData] = useGetCategories(userId);
    const [bookmarksData] = useGetBookmarks(userId);

    useEffect(() => {
        if (categoriesData.length && setCategories && setActiveCategory) {
            setCategories(categoriesData);
            setActiveCategory(categoriesData[0]._id);
        }
    }, [categoriesData]);

    useEffect(() => {
        if (bookmarksData.length && setBookmarks) {
            setBookmarks(bookmarksData);
        }
    }, [bookmarksData]);

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