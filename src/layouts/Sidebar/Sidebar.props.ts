import { Category } from '../../types/common';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: Category[];
}