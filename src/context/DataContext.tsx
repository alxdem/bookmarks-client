import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Bookmark, Category } from '@t/commonTypes';

type TokenType = string | null;

interface DataObjectProps {
    categories: Category[];
    activeCategory: string;
    bookmarks: Bookmark[];
    token: TokenType;
}

interface ContextProps {
    categories: Category[];
    activeCategory: string;
    bookmarks: Bookmark[];
    token: TokenType;
    setActiveCategory: (value: string) => void;
    setCategories: (value: Category[]) => void;
    setBookmarks: (value: Bookmark[]) => void;
    setToken: (value: TokenType) => void;
}

const initialDataObject: DataObjectProps = {
    categories: [],
    activeCategory: '',
    bookmarks: [],
    token: null,
};

export const DataContext = createContext<ContextProps | null>(null);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [dataContext, setDataContext] = useState<DataObjectProps>(initialDataObject);
    const tokenLocal = localStorage.getItem('token');

    const setActiveCategory = (activeCategory: string) => {
        setDataContext(state => ({
            ...state,
            activeCategory,
        }));
    };

    const setCategories = (categories: Category[]) => {
        setDataContext(state => ({
            ...state,
            categories: [...categories],
        }));
    };

    const setBookmarks = (bookmarks: Bookmark[]) => {
        setDataContext(state => ({
            ...state,
            bookmarks: [...bookmarks],
        }));
    };

    const setToken = (token: TokenType) => {
        setDataContext(state => ({
            ...state,
            token,
        }));
    };

    if (tokenLocal && !dataContext.token) {
        setToken(tokenLocal);
    }

    return (
        <DataContext.Provider value={{
            categories: dataContext.categories,
            activeCategory: dataContext.activeCategory,
            bookmarks: dataContext.bookmarks,
            token: dataContext.token,
            setActiveCategory,
            setCategories,
            setBookmarks,
            setToken,
        }}>
            {children}
        </DataContext.Provider>
    );
};