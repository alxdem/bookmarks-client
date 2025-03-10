import { useEffect, useState } from 'react';
import { Bookmark } from '@t/commonTypes';
import { message } from '@utils/variables';

interface useGetBookmarksProps {
    (userId: string): [Bookmark[], boolean, string];
}

const useGetBookmarks: useGetBookmarksProps = (userId) => {
    const [data, setData] = useState<Bookmark[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    if (!userId) {
        throw Error(message.USER_ID_NOT_FOUND);
    }

    useEffect(() => {
        const urlWithParams = `${import.meta.env.VITE_API_URL}/items?userId=${userId}`;

        const fetchData = async () => {
            try {
                const res = await fetch(urlWithParams);

                if (!res.ok) {
                    throw Error(message.BOOKMARKS_GET_ERROR);
                }

                const dataJson = await res.json();

                setData(dataJson);
                setError('');
            } catch (error: unknown) {
                if (typeof error === 'string') {
                    setError(error);
                } else if (error instanceof TypeError) {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return [data, isLoading, error];
}

export default useGetBookmarks;