import { message } from '@utils/variables';
import { useContext, useState } from 'react';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { Bookmark, BookmarkEdit } from '@t/commonTypes';
import { setCatchError } from '@utils/methods';

function useEditBookmark() {
    const userId = '673b3e623f2c79dde1aa2e4d';

    if (!userId) {
        throw new Error(message.USER_ID_NOT_FOUND);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { token, updateBookmark } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};

    const editBookmark = async (payload: BookmarkEdit) => {
        setIsLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/items/${payload._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...payload, userId }),
            });

            const data: Bookmark = await res.json();

            if (!data._id) return;

            if (updateBookmark) {
                updateBookmark(data);
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
    };

    return [editBookmark, isLoading, error] as const;
}

export default useEditBookmark;