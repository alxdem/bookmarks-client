import { useContext } from 'react';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { BookmarkCreate } from '@t/commonTypes';
import {lSBookmarkClear} from "@utils/methods.ts";
import {supabase} from '@utils/supabase';

function useCreateBookmark() {
    const { activeCategoryId, addBookmark } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};

    const createBookmarkHandler = async (payload: BookmarkCreate) => {
        const {data} = await supabase
            .from('bookmarks')
            .insert([{
                url: payload.url,
                title: payload.title,
                description: payload.description,
                category_id: activeCategoryId,
                user_id: '',
            }])
            .select()
            .single();

        if (!data || !data.id) {
            return;
        }

        if (addBookmark) {
            addBookmark({
                id: data.id,
                title: data.title,
                description: data.description || undefined,
                url: data.url,
                userId: data.user_id,
                categoryId: data.category_id,
            });
        }

        if (setModalClose) {
            setModalClose();
        }

        lSBookmarkClear();

        return data;
    };

    return [createBookmarkHandler] as const;
}

export default useCreateBookmark;