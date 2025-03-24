import { DataContext } from '@/context/DataContext';
import { setCatchError } from '@/utils/methods';
import { message } from '@/utils/variables';
import { Bookmark } from '@t/commonTypes';
import { useContext, useState } from 'react';

interface DeleteBookmarkProps {
    (id?: string): Promise<Bookmark | undefined>;
}

function useDeleteBookmark() {
    const userId = '673b3e623f2c79dde1aa2e4d';
    if (!userId) {
        throw new Error(message.USER_ID_NOT_FOUND);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { removeBookmark, token } = useContext(DataContext) || {};

    const deleteBookmark: DeleteBookmarkProps = async (id) => {
        if (!id) {
            console.error('Не передан id закладки для удаления');
            return;
        }

        setIsLoading(true);

        try {
            const urlWithParams = `${import.meta.env.VITE_API_URL}/items/${id}`;
            const res = await fetch(urlWithParams, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId,
                }),
            });
            if (!res.ok) {
                throw new Error('Не смог получить данные в запросе');
            }

            const dataJson: Bookmark = await res.json();

            if (removeBookmark) {
                removeBookmark(dataJson._id);
            }

            setError('');
            return dataJson;
        } catch (error: unknown) {
            setCatchError(error, setError);
        } finally {
            setIsLoading(false);
        }

    };

    return [deleteBookmark, isLoading, error] as const;
};

export default useDeleteBookmark;