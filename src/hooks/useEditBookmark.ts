import { useContext, useState } from 'react';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { BookmarkEdit } from '@t/commonTypes';
import {supabase} from '@utils/supabase';
import { lSBookmarkClear, bookmarkToUpdateData, bookmarkToFE } from "@utils/methods.ts";

function useEditBookmark() {
    const { updateBookmark } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const editBookmarkHandler = async (payload: BookmarkEdit) => {
        setIsLoading(true);
        setError('');

        try {
            const {data, error: supabaseError} = await supabase
                .from('bookmarks')
                .update(bookmarkToUpdateData(payload))
                .eq('id', payload.id)
                .select()
                .single();

            if (supabaseError) {
                setError(supabaseError.message);
                return;
            }

            if (!data || !data?.id) {
                return;
            }

            if (updateBookmark) {
                updateBookmark(bookmarkToFE(data));
            }

            if (setModalClose) {
                setModalClose();
            }

            lSBookmarkClear();

            return data;
        } finally {
            setIsLoading(false);
        }
    };

    return [editBookmarkHandler, isLoading, error] as const;
}

export default useEditBookmark;