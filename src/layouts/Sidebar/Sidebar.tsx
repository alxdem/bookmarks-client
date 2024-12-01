import Nav from '../../components/Nav/Nav';
import styles from './Sidebar.module.css';
import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';

const Sidebar = ({ className }: SidebarProps) => {
    return (
        <aside className={cn(styles.sidebar, className)}>
            sidebar
            <Nav />
        </aside>
    );
};

export default Sidebar;