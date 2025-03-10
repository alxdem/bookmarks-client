import { CategoryCreateFormProps } from '@components/FormCategory/FormCategory.props';

export type CrudMethod = 'GET' | 'POST' | 'PATCH' | 'DEL';
export type modalTypeCategory = 'categoryCreate' | 'categoryUpdate';
export type modalTypeBookmark = 'bookmark';
export type modalType = modalTypeCategory | modalTypeBookmark | 'confirm';

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

export interface FetchOptions {
    method?: CrudMethod;
    headers?: HeadersInit;
    body?: BodyInit;
}

export interface SetCatchError {
    (
        error: unknown,
        setError: (value: React.SetStateAction<string>) => void,
    ): void;
}

export const isCategoryType = (type: modalType): type is modalTypeCategory => {
    return type === 'categoryCreate' || type === 'categoryUpdate';
};

export type CategoryEdit = Pick<Category, '_id' | 'title' | 'description'>;
export type CategoryEditOrCreate = CategoryCreateFormProps | CategoryEdit;
export type BookmarkCreate = Omit<Bookmark, '_id'>;
export type BookmarkEditOrCreate = BookmarkCreate | Bookmark;