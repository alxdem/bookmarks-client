import {useContext, useEffect, useState} from 'react';
import { Bookmark } from '@t/commonTypes';
import useFetch from '@hooks/useFetch';
import {DataContext} from "@context/DataContext.tsx";
import { checkLocalStorageArray } from '@utils/methods';
import { LSKey } from '@utils/variables';

const useGetBookmarks = () => {
    const { userId } = useContext(DataContext) || {};
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [getData, isLoading, error] = useFetch<Bookmark[]>();

    useEffect(() => {
        const fetchData = async () => {
            const urlWithParams = `${import.meta.env.VITE_API_URL}/items?userId=${userId}`;
            const data = await getData('GET', urlWithParams);

            if (!data || data.length < 1) {
                return;
            }

            localStorage.setItem(LSKey.BOOKMARKS, JSON.stringify(data));
            setBookmarks(data);
        }

        checkLocalStorageArray<Bookmark[]>(LSKey.BOOKMARKS, setBookmarks, fetchData);
    }, []);

    return [bookmarks, isLoading, error] as const;
}

export default useGetBookmarks;