import {useState, useContext} from 'react';
import { DataContext } from "@context/DataContext.tsx";
import { message } from "@utils/variables.ts";
import {setCatchError} from "@utils/methods.ts";

const useFetch = <T>() => {
    const { token, userId } = useContext(DataContext) || {};
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!userId) {
        throw new Error(message.USER_ID_NOT_FOUND);
    }

    const fetchData = async (method: string, url: string, body?: object): Promise<T | undefined> => {
        setIsLoading(true);

        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        if (method !== 'GET') {
            options.body = body ? JSON.stringify({ ...body, userId }): JSON.stringify({ userId });
        }

        try {
            const res = await fetch(url, options);

            if (!res.ok) {
                throw new Error('Ошибка в запросе');
            }

            const data: T = await res.json();
            setError('');
            return data;
        } catch (error: unknown) {
            setCatchError(error, setError);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetchData, isLoading, error] as const;
};

export default useFetch;