import { Category } from '@t/commonTypes';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: Category[];
}