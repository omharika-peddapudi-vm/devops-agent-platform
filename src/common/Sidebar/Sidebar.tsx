import './Sidebar.css';
import {TbRobot} from 'react-icons/tb';
import {RxDashboard} from 'react-icons/rx';
import {MdOutlineMonitor, MdOutlineWarningAmber} from 'react-icons/md';
import {VscGitPullRequest, VscServer, VscGithub} from 'react-icons/vsc';
import {RiRobot2Line} from 'react-icons/ri';
import type {IconType} from 'react-icons';

type NavItem = {
    label: string;
    icon: IconType;
    active?: boolean;
};

const NAV_ITEMS: NavItem[] = [
    {label: 'Dashboard',                icon: RxDashboard},
    {label: 'AI Assistant',             icon: RiRobot2Line},
    {label: 'Pipeline Management',      icon: VscGitPullRequest},
    {label: 'Infrastructure Management',icon: VscServer},
    {label: 'Github Management',        icon: VscGithub},
    {label: 'Workflow Monitoring',      icon: MdOutlineMonitor, active: true},
    {label: 'Failure Analysis',         icon: MdOutlineWarningAmber},
];

const Sidebar = ({open}: {open: boolean}) => (
    <aside className={`app-sidebar ${open ? '' : 'app-sidebar--closed'}`}>
        <div className='sidebar-brand'>
            <div className='brand-icon'><TbRobot size={22} /></div>
            <div>
                <div className='brand-title'>AI DevOps</div>
                <div className='brand-subtitle'>Platform</div>
            </div>
        </div>

        <nav className='sidebar-nav'>
            {NAV_ITEMS.map(({label, icon: Icon, active}) => (
                <button
                    key={label}
                    className={`sidebar-link ${active ? 'active' : ''}`}
                    type='button'
                >
                    <Icon size={17} className='sidebar-nav-icon' />
                    <span>{label}</span>
                </button>
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
