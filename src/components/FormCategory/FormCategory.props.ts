import { modalTypeCategory } from '@t/commonTypes';
import { Category } from '@t/commonTypes';

export interface FormCategoryProps {
    type: modalTypeCategory;
    id?: string;
    remove: (id: string) => void;
}

export type CategoryCreateFormProps = Pick<Category, 'title' | 'description'>;