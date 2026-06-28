import { DataContext } from '@context/DataContext';
import { useContext } from 'react';
import {supabase} from '@utils/supabase';

function useDeleteCategory() {
    const { removeCategory } = useContext(DataContext) || {};

    const deleteCategoryHandler = async (id?: string) => {
        if (!id) {
            console.error('Не передан id категории для удаления');
            return;
        }

        const {data} = await supabase
            .from('categories')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (removeCategory && data?.id) {
            removeCategory(data.id);
        }

        return data;
    };

    return [deleteCategoryHandler] as const;
}

export default useDeleteCategory;