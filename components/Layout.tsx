
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '../context/LanguageContext';

const Layout: React.FC = () => {
    const { dir } = useLanguage();

    return (
        <div className="bg-birlik-neutral-offwhite text-birlik-neutral-charcoal min-h-screen flex flex-col font-sans" dir={dir}>
            <Header />
            <main className="flex-grow pt-20"> {/* Add padding-top to avoid content being hidden by sticky header */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
