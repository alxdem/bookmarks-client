import { useContext, useEffect, useState } from 'react';
import { Bookmark } from '../types/common';
import useGetBookmarks from './useGetBookmarks';
import { DataContext } from '../App';

function useActiveBookmarks() {
    const { dataObject } = useContext(DataContext);
    const [data, setData] = useState<Bookmark[]>([]);
    const items = useGetBookmarks();

    useEffect(() => {
        const activeItems = items.filter(item => item.categoryId === dataObject.activeCategory);
        setData(activeItems);
    }, [items, dataObject.activeCategory]);

    return data;
}

export default useActiveBookmarks;