import useFetch from '@hooks/useFetch.ts';
import {Bookmark, Response} from '@t/commonTypes.ts';
import {lSDataSet} from '@utils/methods.ts';
import {LSKey} from '@utils/variables.ts';
import {useContext} from 'react';
import {DataContext} from '@context/DataContext';

function useOrderBookmarks() {
    const [fetchItems, isLoading, error] = useFetch<Response<Bookmark[]>>();
    const { setBookmarks} = useContext(DataContext) || {};

    const reorder = async (items: Bookmark[]) => {
        const url = `${import.meta.env.VITE_API_URL}/items/reorder`;
        const reordered = items.map((item, index) => ({
            _id: item._id,
            order: index,
        }));
        const data = await fetchItems('POST', url, {
            reordered
        });

        if (!data?.success) {
            return;
        }

        const bookmarks = data.data || [];

        if (setBookmarks) {
            setBookmarks(bookmarks);
        }
        lSDataSet<Bookmark[]>(LSKey.BOOKMARKS, bookmarks);
    };

    return [reorder, isLoading, error] as const;
}

export default useOrderBookmarks;