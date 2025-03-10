import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Bookmark, Category, CategoryEdit } from '@t/commonTypes';

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
    addCategory: (value: Category) => void;
    removeCategory: (id: string) => void;
    updateCategory: (props: CategoryEdit) => void;
    addBookmark: (value: Bookmark) => void;
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

    const addCategory = (category: Category) => {
        const copyArray = dataContext.categories || [];
        copyArray.push(category);

        setDataContext(state => ({
            ...state,
            categories: [...copyArray],
        }));
    };

    const removeCategory = (id: string) => {
        const copyArray = dataContext.categories || [];
        const newArray = copyArray.filter(category => category._id !== id);

        setDataContext(state => ({
            ...state,
            categories: [...newArray],
        }));
    };

    const updateCategory = ({ _id, title, description }: CategoryEdit) => {
        setDataContext(state => ({
            ...state,
            categories: state.categories.map(category =>
                category._id === _id
                    ? { ...category, title, description }
                    : category
            ),
        }));
    };

    const setBookmarks = (bookmarks: Bookmark[]) => {
        setDataContext(state => ({
            ...state,
            bookmarks: [...bookmarks],
        }));
    };

    const addBookmark = (bookmark: Bookmark) => {
        const copyArray = dataContext.bookmarks || [];
        copyArray.push(bookmark);

        setDataContext(state => ({
            ...state,
            bookmarks: [...copyArray],
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
            addCategory,
            removeCategory,
            updateCategory,
            addBookmark,
        }}>
            {children}
        </DataContext.Provider>
    );
};