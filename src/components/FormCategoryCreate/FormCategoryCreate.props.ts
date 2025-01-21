export interface CategoryCreateFormProps {
    userId: string;
    title: string;
    description: string;
}

export interface CategoryCreateFormResponse extends CategoryCreateFormProps {
    _id: string;
    order: number;
}