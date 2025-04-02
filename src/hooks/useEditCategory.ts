import { Category, CategoryEdit } from '@t/commonTypes';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { message } from '@utils/variables';
import { useContext, useState } from 'react';
import { setCatchError } from '@utils/methods';

function useEditCategory() {
    const { token, updateCategory, userId } = useContext(DataContext) || {};

    if (!userId) {
        throw new Error(message.USER_ID_NOT_FOUND);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { setModalClose } = useContext(ServiceContext) || {};

    const editCategory = async (payload: CategoryEdit) => {
        setIsLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/${payload._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...payload, userId }),
            });
            const data: Category = await res.json();

            if (!data._id) return;

            if (updateCategory) {
                updateCategory(data);
            }

            if (setModalClose) {
                setModalClose();
            }

            return data;
        } catch (error: unknown) {
            setCatchError(error, setError);
        } finally {
            setIsLoading(false);
        }
    }

    return [editCategory, isLoading, error] as const;
};

export default useEditCategory;