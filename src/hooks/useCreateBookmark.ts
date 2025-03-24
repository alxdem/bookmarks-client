import { message } from '@utils/variables';
import { useContext, useState } from 'react';
import { DataContext } from '@context/DataContext';
import { setCatchError } from '@utils/methods';
import { ServiceContext } from '@context/ServiceContext';
import { Bookmark, BookmarkCreate } from '@t/commonTypes';

function useCreateBookmark() {
    const userId = '673b3e623f2c79dde1aa2e4d';

    if (!userId) {
        throw new Error(message.USER_ID_NOT_FOUND);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { activeCategoryId, token, addBookmark } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};

    const createBookmark = async (payload: BookmarkCreate) => {
        setIsLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...payload,
                    userId,
                    categoryId: activeCategoryId,
                }),
            });
            const data: Bookmark = await res.json();

            if (!data._id) return;

            if (addBookmark) {
                addBookmark(data);
            }

            if (setModalClose) {
                setModalClose();
            }

            return data;
        } catch (error: unknown) {
            setCatchError(error, setError);
        } finally {
            setIsLoading(false);
        }
    }

    return [createBookmark, isLoading, error] as const;
}

export default useCreateBookmark;