import { CategoryCreateFormProps } from '@components/FormCategory/FormCategory.props';
import {Database} from '@/types/database.types.ts';
import {SetStateAction, ReactNode} from 'react';

export type ModalTypeCategory = 'categoryCreate' | 'categoryUpdate';
export type ModalTypeBookmark = 'bookmarkCreate' | 'bookmarkUpdate';
export type ModalType = ModalTypeCategory | ModalTypeBookmark | 'confirm';

export interface Response<T> {
    success?: boolean;
    data?: T;
}

export interface ILayout {
    children: ReactNode;
}

export interface Category {
    id: string;
    title: string;
    description: string;
    order: number;
    userId: string;
}

export interface Bookmark {
    id: string,
    userId: string,
    title: string,
    url: string,
    description?: string,
    categoryId?: string,
    order?: number,
    image?: string,
}

export interface SetCatchError {
    (
        error: unknown,
        setError: (value: SetStateAction<string>) => void,
    ): void;
}

export const isCategoryType = (type: ModalType): type is ModalTypeCategory => {
    return type === 'categoryCreate' || type === 'categoryUpdate';
};

export const isBookmarkType = (type: ModalType): type is ModalTypeBookmark => {
    return type === 'bookmarkCreate' || type === 'bookmarkUpdate';
}

export type CategoryEdit = Pick<Category, 'id' | 'title' | 'description'>;
export type CategoryEditOrCreate = CategoryCreateFormProps | CategoryEdit;

type BookmarkCreateFormProps = Pick<Bookmark, 'title' | 'description' | 'url' | 'categoryId'>;
export type BookmarkCreate = Omit<Bookmark, 'id' | 'userId'>;
export type BookmarkEdit = Pick<Bookmark, 'id' | 'title' | 'description' | 'url' | 'categoryId'>;
export type BookmarkEditOrCreate = BookmarkCreateFormProps | BookmarkEdit;

export type EntityType = 'category' | 'bookmark' | null;

export type CategoryResponse = Database['public']['Tables']['categories']['Row'];
export type BookmarkResponse = Database['public']['Tables']['bookmarks']['Row'];
export type BookmarksSortRequest = {
    id: string;
    sort_order: number;
};