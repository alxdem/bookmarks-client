import { useContext } from 'react';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { Bookmark, BookmarkEdit } from '@t/commonTypes';
import useFetch from '@hooks/useFetch';
import { lSBookmarkClear } from "@utils/methods.ts";

function useEditBookmark() {
    const { updateBookmark } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};
    const [editBookmark, isLoading, error] = useFetch<Bookmark>();

    const editBookmarkHandler = async (payload: BookmarkEdit) => {
        const urlWithParams = `${import.meta.env.VITE_API_URL}/items/${payload._id}`;
        const data = await editBookmark('PATCH', urlWithParams, payload);

        if (!data || !data._id) {
            return;
        }

        if (updateBookmark) {
            updateBookmark(data);
        }

        if (setModalClose) {
            setModalClose();
        }

        lSBookmarkClear();

        return data;
    };

    return [editBookmarkHandler, isLoading, error] as const;
}

export default useEditBookmark;