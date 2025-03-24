import { SetCatchError, Category, SelectOption } from '@t/commonTypes';

const setCatchError: SetCatchError = (error, setError) => {
    if (typeof error === 'string') {
        setError(error);
    } else if (error instanceof TypeError) {
        setError(error.message);
    }
}

const createOptionsFromCategories = (items: Category[]): SelectOption[] => {
    return items.map(item => ({
        value: item._id,
        label: item.title,
    }));
};

const hasKey = <T extends object>(obj: T, key: keyof T): boolean => {
    return key in obj;
};

export {
    setCatchError,
    createOptionsFromCategories,
    hasKey,
}