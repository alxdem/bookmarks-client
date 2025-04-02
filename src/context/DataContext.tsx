import { createContext, FC, PropsWithChildren, useState } from 'react';
import {Bookmark, BookmarkEdit, Category, CategoryEdit } from '@t/commonTypes';
import { createOptionsFromCategories } from '@utils/methods';
import { OptionProps } from '@components/FieldSelect/FieldSelect.props';

type StringOrNull = string | null;

interface DataObjectProps {
    categories: Category[];
    categoriesForSelect: OptionProps[];
    activeCategoryId: string;
    bookmarks: Bookmark[];
    token: StringOrNull;
    userId: StringOrNull;
}

interface ContextProps {
    categories: Category[];
    activeCategoryId: string;
    categoriesForSelect: OptionProps[];
    bookmarks: Bookmark[];
    token: StringOrNull;
    userId: StringOrNull;
    setActiveCategoryId: (value: string) => void;
    setCategories: (value: Category[]) => void;
    setBookmarks: (value: Bookmark[]) => void;
    setToken: (value: StringOrNull) => void;
    setUserId: (id: StringOrNull) => void;
    addCategory: (value: Category) => void;
    removeCategory: (id: string) => void;
    removeBookmark: (id: string) => void;
    updateCategory: (props: CategoryEdit) => void;
    addBookmark: (value: Bookmark) => void;
    updateBookmark: (value: Bookmark) => void;
}

const initialDataObject: DataObjectProps = {
    categories: [],
    categoriesForSelect: [],
    activeCategoryId: '',
    bookmarks: [],
    token: null,
    userId: null,
};

export const DataContext = createContext<ContextProps | null>(null);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [dataContext, setDataContext] = useState<DataObjectProps>(initialDataObject);
    const tokenLocal = localStorage.getItem('token');
    const userIdLocal = localStorage.getItem('userId');

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

    const removeBookmark = (id: string) => {
        const copyArray = [...dataContext.bookmarks];
        const newArray = copyArray.filter(bookmark => bookmark._id !== id);

        setDataContext(state => ({
            ...state,
            bookmarks: newArray,
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

    const updateBookmark = ({ _id, title, description, categoryId }: BookmarkEdit) => {
        const newArray = dataContext.bookmarks.map(bookmark =>
            bookmark._id === _id
            ? { ...bookmark, title, description, categoryId }
            : bookmark
        );
        setDataContext(state => ({
            ...state,
            bookmarks: newArray,
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

    const setToken = (token: StringOrNull) => {
        setDataContext(state => ({
            ...state,
            token,
        }));
    };

    const setUserId = (id: StringOrNull) => {
      setDataContext(state => ({
          ...state,
          userId: id,
      }));
    };

    if (tokenLocal && !dataContext.token) {
        setToken(tokenLocal);
    }

    if (userIdLocal && !dataContext.userId) {
        setUserId(userIdLocal);
    }

    return (
        <DataContext.Provider value={{
            categories: dataContext.categories,
            activeCategoryId: dataContext.activeCategoryId,
            categoriesForSelect: dataContext.categoriesForSelect,
            bookmarks: dataContext.bookmarks,
            token: dataContext.token,
            userId: dataContext.userId,
            setActiveCategoryId,
            setCategories,
            setBookmarks,
            setToken,
            setUserId,
            addCategory,
            removeCategory,
            removeBookmark,
            updateCategory,
            addBookmark,
            updateBookmark,
        }}>
            {children}
        </DataContext.Provider>
    );
};