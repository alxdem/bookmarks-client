import { ModalTypeCategory } from '@t/commonTypes';
import { Category } from '@t/commonTypes';

export interface FormCategoryProps {
    type: ModalTypeCategory;
    id?: string;
    remove: (id: string) => void;
}

export type CategoryCreateFormProps = Pick<Category, 'title' | 'description'>;