import { CategoryEdit } from '@t/commonTypes';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';
import { useContext } from 'react';
import {lSCategoryClear} from '@utils/methods';
import {supabase} from '@utils/supabase';
import {categoryToUpdateData} from '@utils/methods';

function useEditCategory() {
    const { updateCategory } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};

    const editCategoryHandler = async (payload: CategoryEdit) => {
        const {data} = await supabase
            .from('categories')
            .update(categoryToUpdateData(payload))
            .eq('id', payload.id)
            .select()
            .single();

        if (!data || !data.id) {
            return;
        }

        if (updateCategory) {
            updateCategory(categoryToUpdateData({
                id: data.id,
                title: data.title,
                description: data.description || '',
            }));
        }

        if (setModalClose) {
            setModalClose();
        }

        lSCategoryClear();

        return data;
    };

    return [editCategoryHandler] as const;
}

export default useEditCategory;