import { useContext } from 'react';
import { DataContext } from '@context/DataContext';
import { CategoryCreateFormProps } from '@components/FormCategory/FormCategory.props';
import { ServiceContext } from '@context/ServiceContext';
import { Category } from '@/types/commonTypes';
import useFetch from '@hooks/useFetch';
import {lSCategoryClear} from "@utils/methods.ts";

function useCreateCategory() {
    const { addCategory } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};
    const [ createCategory, isLoading, error] = useFetch<Category>();

    const createCategoryHandler = async (payload: CategoryCreateFormProps) => {
        if (!payload.title) {
            console.error('Не передан title');
            return;
        }

        const urlWithParams = `${import.meta.env.VITE_API_URL}/categories`;
        const data = await createCategory('POST', urlWithParams, payload);

        if (!data || !data._id) return;

        if (addCategory) {
            addCategory(data);
        }

        if (setModalClose) {
            setModalClose();
        }

        lSCategoryClear();

        return data;
    };

    return [createCategoryHandler, isLoading, error] as const;
}

export default useCreateCategory;