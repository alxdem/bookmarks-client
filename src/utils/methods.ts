import { SetCatchError, Category } from '@t/commonTypes';
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
        value: item._id,
        label: item.title,
    }));
};

const hasKey = <T extends object>(obj: T, key: keyof T): boolean => {
    return key in obj;
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

export {
    setCatchError,
    createOptionsFromCategories,
    hasKey,
    checkLocalStorageArray,
    lSCategoryClear,
    lSBookmarkClear,
}