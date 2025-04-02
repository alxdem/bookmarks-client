export interface CardProps {
    userId: string;
    url: string;
    title: string;
    description?: string;
    categoryId?: string;
    order?: number;
    image?: string;
    onRemove: () => void;
    onEdit: () => void;
}