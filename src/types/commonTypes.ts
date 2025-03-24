import { CategoryCreateFormProps } from '@components/FormCategory/FormCategory.props';

export type CrudMethod = 'GET' | 'POST' | 'PATCH' | 'DEL';
export type ModalTypeCategory = 'categoryCreate' | 'categoryUpdate';
export type ModalTypeBookmark = 'bookmark';
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

export const isCategoryType = (type: ModalType): type is ModalTypeCategory => {
    return type === 'categoryCreate' || type === 'categoryUpdate';
};

export interface SelectOption {
    value: string;
    label: string;
}

export type CategoryEdit = Pick<Category, '_id' | 'title' | 'description'>;
export type CategoryEditOrCreate = CategoryCreateFormProps | CategoryEdit;
export type BookmarkCreate = Omit<Bookmark, '_id'>;
export type BookmarkEditOrCreate = BookmarkCreate | Bookmark;