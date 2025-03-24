import { createContext, FC, PropsWithChildren, useState } from 'react';
import { Bookmark, Category, CategoryEdit, SelectOption } from '@t/commonTypes';
import { createOptionsFromCategories } from '@utils/methods';

type TokenType = string | null;

interface DataObjectProps {
    categories: Category[];
    categoriesForSelect: SelectOption[];
    activeCategoryId: string;
    bookmarks: Bookmark[];
    token: TokenType;
}

interface ContextProps {
    categories: Category[];
    activeCategoryId: string;
    categoriesForSelect: SelectOption[];
    bookmarks: Bookmark[];
    token: TokenType;
    setActiveCategoryId: (value: string) => void;
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
    categoriesForSelect: [],
    activeCategoryId: '',
    bookmarks: [],
    token: null,
};

export const DataContext = createContext<ContextProps | null>(null);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [dataContext, setDataContext] = useState<DataObjectProps>(initialDataObject);
    const tokenLocal = localStorage.getItem('token');

    const setActiveCategoryId = (activeCategoryId: string) => {
        setDataContext(state => ({
            ...state,
            activeCategoryId,
        }));
    };

    const setCategories = (categories: Category[]) => {
        setDataContext(state => ({
            ...state,
            categories: [...categories],
            categoriesForSelect: createOptionsFromCategories(categories),
        }));
    };

    const addCategory = (category: Category) => {
        const copyArray = dataContext.categories || [];
        copyArray.push(category);

        setDataContext(state => ({
            ...state,
            categories: [...copyArray],
            categoriesForSelect: createOptionsFromCategories(copyArray),
        }));
    };

    const removeCategory = (id: string) => {
        const copyArray = dataContext.categories || [];
        const newArray = copyArray.filter(category => category._id !== id);

        setDataContext(state => ({
            ...state,
            categories: [...newArray],
            categoriesForSelect: createOptionsFromCategories(newArray),
        }));
    };

    const updateCategory = ({ _id, title, description }: CategoryEdit) => {
        const newArray = dataContext.categories.map(category =>
            category._id === _id
                ? { ...category, title, description }
                : category
        );
        setDataContext(state => ({
            ...state,
            categories: newArray,
            categoriesForSelect: createOptionsFromCategories(newArray),
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
            activeCategoryId: dataContext.activeCategoryId,
            categoriesForSelect: dataContext.categoriesForSelect,
            bookmarks: dataContext.bookmarks,
            token: dataContext.token,
            setActiveCategoryId,
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