import './Header.css';
import {RxHamburgerMenu} from 'react-icons/rx';
import {IoNotificationsOutline, IoHelpCircleOutline, IoChevronDownOutline} from 'react-icons/io5';

type HeaderProps = {
    title: string;
    subtitle: string;
    onMenuClick: () => void;
};

const Header = ({title, subtitle, onMenuClick}: HeaderProps) => (
    <header className='app-header'>
        <div className='app-header-left'>
            <button type='button' className='menu-button' onClick={onMenuClick} aria-label='Toggle sidebar'>
                <RxHamburgerMenu size={18} />
            </button>
            <div>
                <div className='app-header-title'>{title}</div>
                <div className='app-header-subtitle'>{subtitle}</div>
            </div>
        </div>
        <div className='app-header-actions'>
            <button type='button' className='icon-button' aria-label='Notifications'>
                <IoNotificationsOutline size={20} />
            </button>
            <button type='button' className='icon-button' aria-label='Help'>
                <IoHelpCircleOutline size={20} />
            </button>
            <button type='button' className='profile-pill'>
                <span>DA</span>
                <span>DevOps Admin</span>
                <IoChevronDownOutline size={14} />
            </button>
        </div>
    </header>
);

export default Header;
