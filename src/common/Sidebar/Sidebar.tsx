import './Sidebar.css';

import { BsChatDots } from 'react-icons/bs';
import { FiHome, FiUserX } from 'react-icons/fi';
import { MdOutlineMonitor, MdOutlineWarningAmber } from 'react-icons/md';
import { TbGitFork, TbRobot } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

import type {ReactNode} from 'react';

interface SidebarItem {
    id: string;
    label: string;
    path: string;
    icon: ReactNode;
    subItems?: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: <FiHome size={17} className='sidebar-nav-icon' />,
    },
    {
        id: 'ai-assistant',
        label: 'AI Assistant',
        path: '/ai-assistant',
        icon: <BsChatDots size={17} className='sidebar-nav-icon' />,
    },
    {
        id: 'pipeline-management',
        label: 'Pipeline Management',
        path: '/pipeline-management',
        icon: <TbGitFork size={17} className='sidebar-nav-icon' />,
    },
    {
        id: 'workflow-monitoring',
        label: 'Workflow Monitoring',
        path: '/workflow-monitoring',
        icon: <MdOutlineMonitor size={17} className='sidebar-nav-icon' />,
    },
    {
        id: 'failure-analysis',
        label: 'Failure Analysis',
        path: '/failure-analysis',
        icon: <MdOutlineWarningAmber size={17} className='sidebar-nav-icon' />,
    },
    {
        id: 'failure-agent',
        label: 'Failure Agent',
        path: '/failure-agent',
        icon: <FiUserX size={17} className='sidebar-nav-icon' />,
    },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

const Sidebar = ({isOpen = true, isCollapsed = false}: SidebarProps) => (
    <aside
        className={`app-sidebar ${isOpen ? '' : 'app-sidebar--closed'} ${
            isCollapsed ? 'sidebar-collapsed' : ''
        }`}
    >
        <div className='sidebar-brand'>
            <div className='brand-icon'>
                <TbRobot size={22} />
            </div>
            <div>
                <div className='brand-title'>AI DevOps</div>
                <div className='brand-subtitle'>Platform</div>
            </div>
        </div>

        <nav className='sidebar-nav'>
            {SIDEBAR_ITEMS.map(({id, label, path, icon}) => (
                <NavLink
                    key={id}
                    to={path}
                    className={({isActive}) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                    }
                >
                    {icon}
                    <span>{label}</span>
                </NavLink>
            ))}
        </nav>

        <div className='sidebar-footer'>
            <div className='profile-avatar'>DA</div>
            <div>
                <div className='profile-name'>DevOps Admin</div>
                <div className='profile-email'>admin@company.com</div>
            </div>
        </div>
    </aside>
);

export default Sidebar;
