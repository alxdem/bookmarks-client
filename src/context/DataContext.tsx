import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Bookmark, Category } from '../types/common';

interface DataObjectProps {
    categories: Category[];
    activeCategory: string;
    bookmarks: Bookmark[];
}

interface ContextProps {
    categories: Category[];
    activeCategory: string;
    bookmarks: Bookmark[];
    setActiveCategory: (value: string) => void;
    setCategories: (value: Category[]) => void;
    setBookmarks: (value: Bookmark[]) => void;
}

const initialDataObject: DataObjectProps = {
    categories: [],
    activeCategory: '',
    bookmarks: [],
};

export const DataContext = createContext<ContextProps | null>(null);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [dataContext, setDataContext] = useState<DataObjectProps>(initialDataObject);

    const setActiveCategory = (activeCategory: string) => {
        setDataContext(state => ({
            ...state,
            activeCategory,
        }));
    };

    const setCategories = (categories: Category[]) => {
        setDataContext(state => ({
            ...state,
            categories,
        }));
    };

    const setBookmarks = (bookmarks: Bookmark[]) => {
        setDataContext(state => ({
            ...state,
            bookmarks,
        }));
    };

    return (
        <DataContext.Provider value={{
            categories: dataContext.categories,
            activeCategory: dataContext.activeCategory,
            bookmarks: dataContext.bookmarks,
            setActiveCategory,
            setCategories,
            setBookmarks,
        }}>
            {children}
        </DataContext.Provider>
    );
};