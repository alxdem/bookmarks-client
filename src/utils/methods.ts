import { SetCatchError, Category, Bookmark, CategoryResponse, BookmarkResponse, CategoryEdit, BookmarkEdit, BookmarksSortRequest } from '@t/commonTypes';
import { OptionProps } from '@components/FieldSelect/FieldSelect.props.ts';
import { LSKey } from '@utils/variables';

const setCatchError: SetCatchError = (error, setError) => {
    if (typeof error === 'string') {
        setError(error);
    } else if (error instanceof TypeError) {
        setError(error.message);
    }
}

const createOptionsFromCategories = (items: Category[]): OptionProps[] => {
    return items.map(item => ({
        value: item.id,
        label: item.title,
    }));
};

const checkLocalStorageArray = <T>(
    key: string,
    setMethod: (value: T) => void,
    fetchMethod: () => Promise<void>,
): void => {
    const localValue = localStorage.getItem(key);
    const value = localValue ? JSON.parse(localValue) : [];

    if (value.length) {
        setMethod(value);
    } else {
        fetchMethod();
    }
};

const lSCategoryClear = () => {
  localStorage.removeItem(LSKey.CATEGORIES);
};

const lSBookmarkClear = () => {
  localStorage.removeItem(LSKey.BOOKMARKS);
};

const lSDataSet = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const categorySBtoUI = (category: CategoryResponse): Category => ({
    id: category.id,
    description: category.description || '',
    title: category.title,
    order: category.sort_order || 0,
    userId: category.user_id || '',
});

const categoryToUpdateData = (category: CategoryEdit): CategoryEdit => ({
    id: category.id,
    title: category.title,
    description: category.description || '',
});

const bookmarkToUpdateData = (bookmark: BookmarkEdit) => ({
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    category_id: bookmark.categoryId,
    description: bookmark.description || '',
});

const bookmarkToFE = (bookmark: BookmarkResponse): Bookmark => ({
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    categoryId: bookmark.category_id,
    description: bookmark.description || '',
    userId: bookmark.user_id || '',
    order: bookmark.sort_order || 0,
});

const bookmarkToResortData = (bookmarks: Bookmark[]): BookmarksSortRequest[] => {
    return bookmarks.map((item, index) => ({
        id: item.id,
        sort_order: index,
    }))
};

export {
    setCatchError,
    createOptionsFromCategories,
    checkLocalStorageArray,
    lSCategoryClear,
    lSBookmarkClear,
    lSDataSet,
    categorySBtoUI,
    categoryToUpdateData,
    bookmarkToUpdateData,
    bookmarkToFE,
    bookmarkToResortData,
}