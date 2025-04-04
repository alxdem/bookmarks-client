import { CategoryCreateFormProps } from '@components/FormCategory/FormCategory.props';

export type CrudMethod = 'GET' | 'POST' | 'PATCH' | 'DEL';
export type ModalTypeCategory = 'categoryCreate' | 'categoryUpdate';
export type ModalTypeBookmark = 'bookmarkCreate' | 'bookmarkUpdate';
export type ModalType = ModalTypeCategory | ModalTypeBookmark | 'confirm';

export interface ILayout {
    children: string | JSX.Element | JSX.Element[];
}

export interface Category {
    _id: string;
    title: string;
    description: string;
    order: number;
    userId: string;
}

export interface Bookmark {
    _id: string,
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
        setError: (value: React.SetStateAction<string>) => void,
    ): void;
}

export const isCategoryType = (type: ModalType): type is ModalTypeCategory => {
    return type === 'categoryCreate' || type === 'categoryUpdate';
};

export const isBookmarkType = (type: ModalType): type is ModalTypeBookmark => {
    return type === 'bookmarkCreate' || type === 'bookmarkUpdate';
}

export type CategoryEdit = Pick<Category, '_id' | 'title' | 'description'>;
export type CategoryEditOrCreate = CategoryCreateFormProps | CategoryEdit;

type BookmarkCreateFormProps = Pick<Bookmark, 'title' | 'description' | 'url' | 'categoryId'>;
export type BookmarkCreate = Omit<Bookmark, '_id' | 'userId'>;
export type BookmarkEdit = Pick<Bookmark, '_id' | 'title' | 'description' | 'url' | 'categoryId'>;
export type BookmarkEditOrCreate = BookmarkCreateFormProps | BookmarkEdit;

export type EntityType = 'category' | 'bookmark' | null; 