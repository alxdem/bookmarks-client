import {FC, PropsWithChildren, useEffect, useState} from 'react';
import {Bookmark, BookmarkEdit, Category, CategoryEdit} from '@t/commonTypes.ts';
import {createOptionsFromCategories} from '@utils/methods.ts';
import {DataContext, DataObjectProps, StringOrNull} from '@context/DataContext';

const initialDataObject: DataObjectProps = {
    categories: [],
    categoriesForSelect: [],
    activeCategoryId: '',
    bookmarks: [],
    token: null,
    userId: null,
};

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
    const [dataContext, setDataContext] = useState<DataObjectProps>(initialDataObject);

    useEffect(() => {
        const tokenLocal = localStorage.getItem('token');
        const userIdLocal = localStorage.getItem('userId');

        if (tokenLocal || userIdLocal) {
            setDataContext(state => ({
                ...state,
                token: tokenLocal || state.token,
                userId: userIdLocal || state.userId,
            }));
        }
    }, []);

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
        const newArray = [...(dataContext.categories || []), category];
        setCategories(newArray);
    };

    const removeCategory = (id: string) => {
        const copyArray = dataContext.categories || [];
        const newArray = copyArray.filter(category => category.id !== id);

        setCategories(newArray);
    };

    const removeBookmark = (id: string) => {
        const copyArray = [...dataContext.bookmarks];
        const newArray = copyArray.filter(bookmark => bookmark.id !== id);

        setDataContext(state => ({
            ...state,
            bookmarks: newArray,
        }));
    };

    const updateCategory = ({ id, title, description }: CategoryEdit) => {
        const newArray = dataContext.categories.map(category =>
            category.id === id
                ? { ...category, title, description }
                : category
        );
        setCategories(newArray);
    };

    const updateBookmark = ({ id, title, description, categoryId }: BookmarkEdit) => {
        const newArray = dataContext.bookmarks.map(bookmark =>
            bookmark.id === id
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
        setDataContext(state => ({
            ...state,
            bookmarks: [...(state.bookmarks || []), bookmark],
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