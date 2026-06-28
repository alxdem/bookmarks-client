import {useEffect, useState} from 'react';
import {Bookmark} from '@t/commonTypes';
import { checkLocalStorageArray, lSDataSet } from '@utils/methods';
import { LSKey } from '@utils/variables';
import { supabase } from '@utils/supabase';

const useGetBookmarks = () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await supabase.from('bookmarks').select('*');

            const dataFormatted: Bookmark[] = data?.map(bookmark => ({
                id: bookmark.id,
                description: bookmark.description || '',
                title: bookmark.title,
                order: bookmark.sort_order || 0,
                userId: bookmark.user_id || '',
                url: bookmark.url,
                categoryId: bookmark.category_id,

            })) || [];

            if (dataFormatted.length < 1) {
                return;
            }

            lSDataSet<Bookmark[]>(LSKey.BOOKMARKS, dataFormatted);
            setBookmarks(dataFormatted);
        }

        checkLocalStorageArray<Bookmark[]>(LSKey.BOOKMARKS, setBookmarks, fetchData);
    }, []);

    return {bookmarks};
}

export default useGetBookmarks;