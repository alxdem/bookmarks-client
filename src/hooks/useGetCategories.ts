import { useContext, useEffect, useState } from 'react';
import { Category } from '@t/commonTypes';
import { message } from '@utils/variables';
import { DataContext } from '@context/DataContext';

interface useGetCategoriesProps {
    (userId: string): [Category[], boolean, string];
}

const useGetCategories: useGetCategoriesProps = (userId) => {
    const [data, setData] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const { token } = useContext(DataContext) || {};

    if (!userId) {
        throw Error(message.USER_ID_NOT_FOUND);
    }

    useEffect(() => {
        const urlWithParams = `${import.meta.env.VITE_API_URL}/categories?userId=${userId}`;

        const fetchData = async () => {
            try {
                const res = await fetch(urlWithParams, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw Error(message.CATEGORIES_GET_ERROR);
                }

                const dataJson = await res.json();

                setData(dataJson);
                setError('');
            } catch (error: unknown) {
                if (typeof error === 'string') {
                    setError(error);
                } else if (error instanceof TypeError) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return [data, isLoading, error];
}

export default useGetCategories;