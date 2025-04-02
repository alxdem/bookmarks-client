import { message } from '@utils/variables';
import { useContext, useState } from 'react';
import { DataContext } from '@context/DataContext';
import { setCatchError } from '@utils/methods';
import { CategoryCreateFormProps } from '@components/FormCategory/FormCategory.props';
import { ServiceContext } from '@context/ServiceContext';
import { Category } from '@/types/commonTypes';

function useCreateCategory() {
    const { token, addCategory, userId } = useContext(DataContext) || {};

    if (!userId) {
        throw new Error(message.USER_ID_NOT_FOUND);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { setModalClose } = useContext(ServiceContext) || {};

    const createCategory = async (payload: CategoryCreateFormProps) => {
        setIsLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...payload, userId }),
            });
            const data: Category = await res.json();

            if (!data._id) return;

            if (addCategory) {
                addCategory(data);
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

    return [createCategory, isLoading, error] as const;
}

export default useCreateCategory;