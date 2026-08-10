import './MainLayout.css';

import {useState} from 'react';

import Footer from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';

type MainLayoutProps = {
    pageTitle: string;
    pageSubtitle: string;
    children: React.ReactNode;
};

const MainLayout = ({pageTitle, pageSubtitle, children}: MainLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className='main-layout'>
            <Sidebar
                isOpen={sidebarOpen}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
                onClose={() => setSidebarOpen(false)}
            />
            <div
                className={`main-layout-content ${sidebarOpen ? '' : 'sidebar-collapsed'}`}
            >
                <Header
                    title={pageTitle}
                    subtitle={pageSubtitle}
                    onMenuClick={() => setSidebarOpen((prev) => !prev)}
                />
                <main className='main-layout-body'>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
