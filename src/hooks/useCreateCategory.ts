import {useContext} from 'react';
import {DataContext} from '@context/DataContext';
import {CategoryCreateFormProps} from '@components/FormCategory/FormCategory.props';
import {ServiceContext} from '@context/ServiceContext';
import {lSCategoryClear, categorySBtoUI} from "@utils/methods.ts";
import {supabase} from '@utils/supabase';

function useCreateCategory() {
    const {addCategory} = useContext(DataContext) || {};
    const {setModalClose} = useContext(ServiceContext) || {};

    const createCategoryHandler = async (payload: CategoryCreateFormProps) => {
        if (!payload.title) {
            console.error('Не передан title');
            return;
        }

        const {data, error} = await supabase
            .from('categories')
            .insert([payload])
            .select();

        if (error || !data) return;

        const result = data[0];
        const category = categorySBtoUI(result);


        if (addCategory) {
            addCategory(category);
        }

        if (setModalClose) {
            setModalClose();
        }

        lSCategoryClear();

        return data;
    };

    return [createCategoryHandler] as const;
}

export default useCreateCategory;