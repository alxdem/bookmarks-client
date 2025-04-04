import { Category } from '@t/commonTypes';
import { DataContext } from '@context/DataContext';
import { useContext } from 'react';
import useFetch from '@hooks/useFetch';

interface DeleteCategoryProps {
    (
        categoryId?: string,
    ): Promise<Category | undefined>;
}

function useDeleteCategory() {
    const { removeCategory } = useContext(DataContext) || {};
    const [deleteCategory, isLoading, error] = useFetch<Category>();

    const deleteCategoryHandler: DeleteCategoryProps = async (id) => {
        if (!id) {
            console.error('Не передан id категории для удаления');
            return;
        }

        const urlWithParams = `${import.meta.env.VITE_API_URL}/categories/${id}`;
        const data = await deleteCategory('DELETE', urlWithParams);

        if (removeCategory && data) {
            removeCategory(data._id);
        }

        return data;
    };

    return [deleteCategoryHandler, isLoading, error] as const;
};

export default useDeleteCategory;