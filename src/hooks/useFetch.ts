import { useState, useEffect } from 'react';
import { FetchOptions } from '@t/commonTypes';



const useFetch = <T>(url: string, initialState: T, options: FetchOptions = {}): [T, boolean, string] => {
    const [data, setData] = useState<T>(initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const res = await fetch(url, options);
            const dataJson = await res.json();

            if (!dataJson.ok) {
                throw Error('Не смог получить данные в запросе');
            }

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

    useEffect(() => {
        fetchData();
    }, [url]);

    return [data, isLoading, error];
};

export default useFetch;