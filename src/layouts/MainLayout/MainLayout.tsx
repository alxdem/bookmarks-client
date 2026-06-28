import { ILayout } from '@t/commonTypes';
import styles from '@layouts/MainLayout/MainLayout.module.css';
import Sidebar from '@layouts/Sidebar/Sidebar';
import { useContext, useEffect } from 'react';
import { DataContext } from '@context/DataContext';
import useGetCategories from '@hooks/useGetCategories';
import useGetBookmarks from '@hooks/useGetBookmarks';
import Modals from '@layouts/Modals/Modals';

const MainLayout = ({ children }: ILayout) => {
    const {
        setActiveCategoryId,
        setCategories,
        setBookmarks
    } = useContext(DataContext) || {};

    const {categories} = useGetCategories();
    const { bookmarks } = useGetBookmarks();

    useEffect(() => {
        if (categories.length && setCategories && setActiveCategoryId) {
            setCategories(categories);
            setActiveCategoryId(categories[0].id);
        }
    }, [categories]);

    useEffect(() => {
        if (bookmarks.length && setBookmarks) {
            setBookmarks(bookmarks);
        }
    }, [bookmarks]);

    return (
        <div className={styles.main}>
            <Sidebar className={styles.sidebar} />
            <section className={styles.inner}>
                {children}
            </section>
            <Modals />
        </div>
    );
};

export default MainLayout;