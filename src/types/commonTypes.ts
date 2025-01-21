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

export type CrudMethod = 'GET' | 'POST' | 'PATCH' | 'DEL';

export interface FetchOptions {
    method?: CrudMethod;
    headers?: HeadersInit;
    body?: BodyInit;
}