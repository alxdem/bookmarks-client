import { CategoryEdit } from '@t/commonTypes';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { useContext } from 'react';
import useFetch from '@hooks/useFetch';

function useEditCategory() {
    const { updateCategory } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};
    const [editCategory, isLoading, error] = useFetch<CategoryEdit>();

    const editCategoryHandler = async (payload: CategoryEdit) => {
        const urlWithParams = `${import.meta.env.VITE_API_URL}/categories/${payload._id}`;
        const data = await editCategory('PATCH', urlWithParams, payload);

        if (!data || !data._id) {
            return
        }

        if (updateCategory) {
            updateCategory(data);
        }

        if (setModalClose) {
            setModalClose();
        }

        return data;
    };

    return [editCategoryHandler, isLoading, error] as const;
}

export default useEditCategory;