import React, { useState, useContext } from 'react';
import { Page } from '../types';
import { AuthContext } from '../contexts/AuthContext';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const auth = useContext(AuthContext);

    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        onNavigate(page);
        setIsMenuOpen(false);
    };

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        auth.logout();
        onNavigate('landing');
        setIsMenuOpen(false);
    };

    const navItems: { page: Page; label: string }[] = [
        { page: 'landing', label: 'Trang chủ' },
        { page: 'governance', label: 'Quản Trị' },
        { page: 'marketing', label: 'Marketing' },
        { page: 'operations', label: 'Vận hành' },
        { page: 'utilities', label: 'Tiện ích Văn phòng' },
        { page: 'financial-tools', label: 'Tiện ích Tài chính' },
        { page: 'pricing', label: 'Bảng giá' },
    ];
    
    const getLinkClassName = (page: Page) => {
        return `font-semibold transition-colors px-2 py-1 rounded-md ${currentPage.startsWith(page) ? 'text-accent bg-accent/10' : 'text-text-secondary hover:text-text-primary'}`;
    };

    const getMobileLinkClassName = (page: Page) => {
        return `block font-semibold py-2 px-3 rounded-md transition-colors ${currentPage.startsWith(page) ? 'text-accent bg-accent/10' : 'text-text-secondary hover:bg-primary hover:text-text-primary'}`;
    };

    return (
        <header id="header" className="bg-primary/50 backdrop-blur-xl border-b border-white/5 shadow-md sticky w-full top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-6 flex items-center justify-between h-20">
                <a href="#" onClick={(e) => handleNavigate(e, 'landing')} className="font-bold text-2xl font-heading text-text-primary">NK <span className="text-accent">AI</span></a>
                
                <div className="flex items-center">
                    <nav className="hidden lg:flex items-center space-x-6">
                        {navItems.map(item => (
                            <a 
                                key={item.page} 
                                href="#" 
                                onClick={(e) => handleNavigate(e, item.page)} 
                                className={getLinkClassName(item.page)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center space-x-2 ml-6 border-l border-white/10 pl-6">
                        {auth.user ? (
                            <>
                                <a href="#" onClick={(e) => handleNavigate(e, 'account')} className={getLinkClassName('account')}>
                                    Tài khoản
                                </a>
                                <a href="#" onClick={handleLogout} className="font-semibold bg-secondary/50 text-text-secondary px-4 py-2 rounded-md text-sm hover:bg-white/10 hover:text-accent transition-colors">
                                    Đăng xuất
                                </a>
                            </>
                        ) : (
                            <a href="#" onClick={(e) => handleNavigate(e, 'auth')} className="font-semibold bg-accent text-primary px-5 py-2 rounded-md text-sm hover:bg-accent-dark transition-colors shadow-md shadow-accent/20">
                                Đăng nhập
                            </a>
                        )}
                    </div>

                    <div className="lg:hidden ml-4">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary p-2 rounded-md hover:bg-white/10" aria-label="Open menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <nav className="lg:hidden bg-secondary/90 backdrop-blur-md p-4 space-y-2 absolute w-full left-0 top-full shadow-lg animate-fade-in-up">
                    {navItems.map(item => (
                       <a 
                           key={item.page} 
                           href="#" 
                           onClick={(e) => handleNavigate(e, item.page)} 
                           className={getMobileLinkClassName(item.page)}
                       >
                           {item.label}
                       </a>
                    ))}
                    <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
                        {auth.user ? (
                            <>
                                <a href="#" onClick={(e) => handleNavigate(e, 'account')} className={getMobileLinkClassName('account')}>Tài khoản</a>
                                <a href="#" onClick={handleLogout} className="block w-full text-left font-semibold py-2 px-3 rounded-md text-text-secondary hover:bg-primary hover:text-text-primary">Đăng xuất</a>
                            </>
                        ) : (
                            <a href="#" onClick={(e) => handleNavigate(e, 'auth')} className="block font-semibold py-2 px-3 rounded-md bg-accent text-primary text-center">
                                Đăng nhập
                            </a>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;