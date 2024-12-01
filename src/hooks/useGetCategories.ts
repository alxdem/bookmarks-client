import { useEffect, useState } from 'react';
import { Category } from '../types/common';

const tempCategoriesData = [
    {
        _id: "c1",
        title: 'Socials',
        description: 'List of popular social networks',
        order: 0,
    },
    {
        _id: "c2",
        title: 'Offline',
        description: '',
        order: 0,
    }
];

function useGetCategories() {
    const [data, setData] = useState<Category[]>([]);

    useEffect(() => {
        console.log('USE * getCategories');
        setData(tempCategoriesData);
    }, [])

    return data;
}

export default useGetCategories;