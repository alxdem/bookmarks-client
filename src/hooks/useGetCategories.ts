import { useContext, useEffect, useState } from 'react';
import {Category} from '@t/commonTypes';
import { DataContext } from '@context/DataContext';
import useFetch from '@hooks/useFetch';

const useGetCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { userId } = useContext(DataContext) || {};
    const [getData, isLoading, error] = useFetch<Category[]>();

    useEffect(() => {
        const fetchData = async () => {
            const urlWithParams = `${import.meta.env.VITE_API_URL}/categories?userId=${userId}`;
            const data = await getData('GET', urlWithParams);

            if (!data || data.length < 1) {
                return;
            }

            setCategories(data);
        };

        fetchData();
    }, []);

    return [categories, isLoading, error] as const;
}

export default useGetCategories;