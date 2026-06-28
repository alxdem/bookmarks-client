import { useEffect, useState } from 'react';
import {Category} from '@t/commonTypes';
import { checkLocalStorageArray, lSDataSet, categorySBtoUI } from '@utils/methods';
import { LSKey } from '@utils/variables';
import { supabase } from '@utils/supabase';

const useGetCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await supabase.from('categories').select('*');

            const dataFormatted: Category[] = data?.map(categorySBtoUI) || [];

            if (dataFormatted.length < 1) {
                return;
            }

            lSDataSet<Category[]>(LSKey.CATEGORIES, dataFormatted);
            setCategories(dataFormatted);
        };

        checkLocalStorageArray<Category[]>(LSKey.CATEGORIES, setCategories, fetchData);
    }, []);

    return {categories};
}

export default useGetCategories;