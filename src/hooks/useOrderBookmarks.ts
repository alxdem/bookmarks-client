import {Bookmark} from '@t/commonTypes.ts';
import {lSDataSet, bookmarkToResortData, bookmarkToFE} from '@utils/methods.ts';
import {LSKey} from '@utils/variables.ts';
import {useContext} from 'react';
import {supabase} from '@utils/supabase';
import {DataContext} from '@context/DataContext';

function useOrderBookmarks() {
    const {setBookmarks} = useContext(DataContext) || {};

    const isLoading = false;

    const reorder = async (items: Bookmark[]) => {
        const reordered = bookmarkToResortData(items);

        const {data, error} = await supabase.rpc('reorder_bookmarks', {
            items: reordered,
        });

        if(error){
            console.error('Reorder error:', error);
            throw error;
        }

        console.log('reorder', {
            data,
            items,
            reordered,
        });

        if (!data) {
            return;
        }

        const bookmarks = data?.map(item => bookmarkToFE(item));

        if (setBookmarks) {
            setBookmarks(bookmarks);
        }
        lSDataSet<Bookmark[]>(LSKey.BOOKMARKS, bookmarks);
    };

    return [reorder, isLoading] as const;
}

export default useOrderBookmarks;