export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    userId: string;
    url: string;
    title: string;
    description?: string;
    categoryId?: string;
    order?: number;
    onRemove: () => void;
    onEdit: () => void;
}