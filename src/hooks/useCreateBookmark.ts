import { useContext } from 'react';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { Bookmark, BookmarkCreate } from '@t/commonTypes';
import useFetch from '@hooks/useFetch';

function useCreateBookmark() {
    const { activeCategoryId, addBookmark } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};
    const [createBookmark, isLoading, error] = useFetch<Bookmark>();

    const createBookmarkHandler = async (payload: BookmarkCreate) => {
        const urlWithParams = `${import.meta.env.VITE_API_URL}/items`;
        const data = await createBookmark('POST', urlWithParams, {
            ...payload,
            categoryId: activeCategoryId,
        });

        if (!data || !data._id) {
            return;
        }

        if (addBookmark) {
            addBookmark(data);
        }

        if (setModalClose) {
            setModalClose();
        }

        return data;
    };

    return [createBookmarkHandler, isLoading, error] as const;
}

export default useCreateBookmark;