import { useContext, useEffect, useState } from 'react';
import { DataContext } from '@context/DataContext';
import { Bookmark } from '@t/commonTypes';

function useActiveBookmarks() {
    const { activeCategoryId, bookmarks } = useContext(DataContext) || {};
    const [data, setData] = useState<Bookmark[]>([]);

    useEffect(() => {
        if (!bookmarks) return;

        const activeBookmarks = bookmarks.filter(item => item.categoryId === activeCategoryId);
        setData(activeBookmarks);

    }, [bookmarks, activeCategoryId]);

    return data;
}

export default useActiveBookmarks;