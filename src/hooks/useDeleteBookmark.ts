import { DataContext } from '@/context/DataContext';
import { useContext } from 'react';
import {supabase} from '@utils/supabase';

function useDeleteBookmark() {
    const {removeBookmark} = useContext(DataContext) || {};

    const deleteBookmarkHandler = async (id?: string) => {
        if (!id) {
            console.error('Не передан id закладки для удаления');
            return;
        }

        const {data} = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (removeBookmark && data?.id) {
            removeBookmark(data.id);
        }

        return data;
    };

    return [deleteBookmarkHandler] as const;
}

export default useDeleteBookmark;