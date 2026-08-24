import './Header.css';

import {
    IoChevronDownOutline,
    IoHelpCircleOutline,
    IoNotificationsOutline,
} from 'react-icons/io5';
import {RxHamburgerMenu} from 'react-icons/rx';

type HeaderProps = {
    title: string;
    subtitle: string;
    onMenuClick: () => void;
};

const Header = ({title, subtitle, onMenuClick}: HeaderProps) => (
    <header className='app-header'>
        <div className='app-header-left'>
            <button
                type='button'
                className='menu-button'
                onClick={onMenuClick}
                aria-label='Toggle sidebar'
            >
                <RxHamburgerMenu size={24} />
            </button>
            <div className='app-header-text'>
                <div className='app-header-title'>{title}</div>
                <div className='app-header-subtitle'>{subtitle}</div>
            </div>
        </div>

        <div className='app-header-actions'>
            <button
                type='button'
                className='icon-button notification-button'
                aria-label='Notifications'
            >
                <IoNotificationsOutline size={21} />
                <span
                    className='notification-badge'
                    aria-label='3 unread notifications'
                >
                    3
                </span>
            </button>
            <button
                type='button'
                className='icon-button help-button'
                aria-label='Help'
            >
                <IoHelpCircleOutline size={22} />
            </button>
            <button type='button' className='profile-pill'>
                <span className='profile-avatar'>DA</span>
                <span className='profile-name'>DevOps Admin</span>
                <IoChevronDownOutline size={16} />
            </button>
        </div>
    </header>
);

export default Header;
