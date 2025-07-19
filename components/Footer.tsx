import React from 'react';
import { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const handleNavigateClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
        e.preventDefault();
        onNavigate(page);
    };

    return (
        <footer className="bg-primary/50 text-text-secondary border-t border-white/5">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-bold font-heading text-lg mb-4 text-text-primary">NK AI</h4>
                        <p className="text-sm">Trợ lý AI dành cho lãnh đạo doanh nghiệp. Nâng cao hiệu quả Quản trị, Tiếp thị và Vận hành.</p>
                        <p className="text-sm mt-4">Hotline: <a href="tel:0817477788" className="hover:text-accent">0817 477 788</a></p>
                        <div className="flex items-center space-x-4 mt-4">
                            <a href="https://www.facebook.com/nk.aiagent" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors" aria-label="Facebook">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                            </a>
                            <a href="tel:+84817477788" className="text-text-secondary hover:text-accent transition-colors" aria-label="Call">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"></path></svg>
                            </a>
                            <a href="mailto:admin@nkaitechnology.onmicrosoft.com" className="text-text-secondary hover:text-accent transition-colors" aria-label="Email">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20,4H4A2,2,0,0,0,2,6V18a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V6A2,2,0,0,0,20,4Zm0,2L12,11,4,6H20ZM4,18V8l8,5,8-5v10H4Z"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold font-heading mb-4 text-text-primary">Sản phẩm</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" onClick={(e) => handleNavigateClick(e, 'governance')} className="hover:text-accent">Quản trị</a></li>
                            <li><a href="#" onClick={(e) => handleNavigateClick(e, 'marketing')} className="hover:text-accent">Marketing</a></li>
                            <li><a href="#" onClick={(e) => handleNavigateClick(e, 'operations')} className="hover:text-accent">Vận hành</a></li>
                            <li><a href="#" onClick={(e) => handleNavigateClick(e, 'utilities')} className="hover:text-accent">Tiện ích Văn phòng</a></li>
                            <li><a href="#" onClick={(e) => handleNavigateClick(e, 'financial-tools')} className="hover:text-accent">Tiện ích Tài chính</a></li>
                            <li><a href="#" onClick={(e) => handleNavigateClick(e, 'pricing')} className="hover:text-accent">Bảng giá</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold font-heading mb-4 text-text-primary">Công ty</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" onClick={(e) => {e.preventDefault(); alert("Thông tin về chúng tôi sẽ sớm được cập nhật!")}} className="hover:text-accent">Về chúng tôi</a></li>
                            <li><a href="#" onClick={(e) => {e.preventDefault(); alert("Thông tin tuyển dụng sẽ sớm được cập nhật!")}} className="hover:text-accent">Tuyển dụng</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold font-heading mb-4 text-text-primary">Pháp lý</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" onClick={(e) => handleNavigateClick(e, 'product-policy')} className="hover:text-accent">Chính sách Sản phẩm</a></li>
                            <li><a href="#" onClick={(e) => handleNavigateClick(e, 'terms-of-service')} className="hover:text-accent">Điều khoản Dịch vụ</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm">
                    <p>&copy; 2024 NK AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;