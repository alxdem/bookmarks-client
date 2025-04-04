import { DataContext } from '@/context/DataContext';
import { Bookmark } from '@t/commonTypes';
import { useContext } from 'react';
import useFetch from '@hooks/useFetch';

interface DeleteBookmarkProps {
    (id?: string): Promise<Bookmark | undefined>;
}

function useDeleteBookmark() {
    const { removeBookmark} = useContext(DataContext) || {};
    const [deleteBookmark, isLoading, error] = useFetch<Bookmark>();

    const deleteBookmarkHandler: DeleteBookmarkProps = async (id) => {
        if (!id) {
            console.error('Не передан id закладки для удаления');
            return;
        }

        const urlWithParams = `${import.meta.env.VITE_API_URL}/items/${id}`;
        const data = await deleteBookmark('DELETE', urlWithParams);

        if (removeBookmark && data) {
            removeBookmark(data._id);
        }

        return data;
    };

    return [deleteBookmarkHandler, isLoading, error] as const;
}

export default useDeleteBookmark;