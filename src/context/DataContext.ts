import {createContext} from 'react';
import {Bookmark, Category, CategoryEdit } from '@t/commonTypes';
import { OptionProps } from '@components/FieldSelect/FieldSelect.props';

export type StringOrNull = string | null;

export interface DataObjectProps {
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

export const DataContext = createContext<ContextProps | null>(null);