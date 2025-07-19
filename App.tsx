import React, { useState, useCallback, useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { ModuleKey, Page } from './types';
import { CATEGORIZED_MODULES } from './data/modules';
import Header from './components/Header';
import Footer from './components/Footer';
import InteractiveModal from './components/InteractiveModal';
import LandingPage from './components/LandingPage';
import ProductPolicyPage from './components/ProductPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import ModuleCategoryPage from './components/ModuleCategoryPage';
import PricingPage from './components/PricingPage';
import Chatbot from './components/Chatbot';
import AuthPage from './components/AuthPage';
import AccountPage from './components/AccountPage';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [modalModule, setModalModule] = useState<ModuleKey | null>(null);
    const auth = useContext(AuthContext);

    const handleOpenModal = useCallback((moduleKey: ModuleKey) => {
        setModalModule(moduleKey);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalModule(null);
    }, []);

    const handleNavigate = useCallback((page: Page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    
    useEffect(() => {
        const protectedPages: Page[] = [
            'governance', 'marketing', 'operations', 'utilities', 
            'financial-tools', 'account', 'crm-dashboard', 
            'hrm-dashboard', 'sales-dashboard', 'okrs-dashboard'
        ];
        
        if (!auth.loading && !auth.user && protectedPages.includes(currentPage)) {
            handleNavigate('auth');
        }
        if (!auth.loading && auth.user && currentPage === 'auth') {
            handleNavigate('governance');
        }
    }, [currentPage, auth.user, auth.loading, handleNavigate]);

    const DashboardPlaceholder: React.FC<{title: string}> = ({title}) => (
        <div className="text-center p-20 container mx-auto animate-fade-in">
            <h1 className="text-4xl font-bold font-heading text-text-primary">{title}</h1>
            <p className="text-xl mt-4 text-text-secondary">Chức năng đang được phát triển. Vui lòng quay lại sau.</p>
        </div>
    );

    const renderPage = () => {
        switch (currentPage) {
            case 'landing':
                return <LandingPage onNavigate={handleNavigate} />;
            case 'auth':
                return <AuthPage onNavigate={handleNavigate} />;
            case 'account':
                return <AccountPage onNavigate={handleNavigate} />;
            case 'product-policy':
                return <ProductPolicyPage />;
            case 'terms-of-service':
                return <TermsOfServicePage />;
            case 'governance':
                return <ModuleCategoryPage 
                            pageTitle="Hệ Điều Hành Doanh Nghiệp Toàn Diện"
                            pageDescription="Tích hợp mọi hoạt động quản lý vào một nền tảng thông minh duy nhất. Các tính năng có ✨ được hỗ trợ bởi Gemini API. Nhấp vào một module để trải nghiệm."
                            modules={CATEGORIZED_MODULES.governance}
                            onModuleClick={handleOpenModal}
                        />;
            case 'marketing':
                 return <ModuleCategoryPage 
                            pageTitle="Trung tâm Chỉ huy Marketing 360°"
                            pageDescription="Từ chiến lược, nội dung, đến quảng cáo và phân tích, quản lý mọi hoạt động marketing trên một nền tảng duy nhất. Các tính năng có ✨ được hỗ trợ bởi Gemini API."
                            modules={CATEGORIZED_MODULES.marketing}
                            onModuleClick={handleOpenModal}
                        />;
            case 'operations':
                 return <ModuleCategoryPage 
                            pageTitle="Trung tâm Điều hành Vận hành Thông minh"
                            pageDescription="Tối ưu hóa mọi mắt xích trong chuỗi giá trị của bạn, từ nhà cung cấp đến khách hàng cuối cùng, với sự trợ giúp của AI. Các tính năng có ✨ được hỗ trợ bởi Gemini API."
                            modules={CATEGORIZED_MODULES.operations}
                            onModuleClick={handleOpenModal}
                        />;
            case 'utilities':
                 return <ModuleCategoryPage 
                            pageTitle="Siêu Trợ lý cho Công việc Hàng ngày"
                            pageDescription="Bộ công cụ AI toàn năng giúp bạn tự động hóa, sáng tạo và tăng tốc mọi tác vụ văn phòng. Các tính năng có ✨ được hỗ trợ bởi Gemini API."
                            modules={CATEGORIZED_MODULES.utilities}
                            onModuleClick={handleOpenModal}
                        />;
            case 'financial-tools':
                 return <ModuleCategoryPage 
                            pageTitle="Bộ công cụ Tài chính & Đầu tư"
                            pageDescription="Nâng cao khả năng phân tích và ra quyết định của bạn với các công cụ tài chính được hỗ trợ bởi AI. Các tính năng có ✨ được hỗ trợ bởi Gemini API."
                            modules={CATEGORIZED_MODULES['financial-tools']}
                            onModuleClick={handleOpenModal}
                        />;
            case 'pricing':
                return <PricingPage onNavigate={handleNavigate} />;
            case 'crm-dashboard':
                return <DashboardPlaceholder title="CRM Dashboard" />;
            case 'hrm-dashboard':
                return <DashboardPlaceholder title="HRM Dashboard" />;
            case 'sales-dashboard':
                return <DashboardPlaceholder title="Sales Dashboard" />;
            case 'okrs-dashboard':
                return <DashboardPlaceholder title="OKRs/KPIs Dashboard" />;
            default:
                 return <LandingPage onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="relative isolate flex flex-col min-h-screen">
             {/* Aurora Background Effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 w-[var(--aurora-size)] h-[var(--aurora-size)]">
                    <div className="aurora-outer absolute w-full h-full rounded-full bg-gradient-to-r from-accent-secondary via-accent to-accent-secondary opacity-50 blur-3xl"></div>
                    <div className="aurora-inner absolute w-full h-full rounded-full bg-gradient-to-r from-accent-secondary via-accent to-accent-secondary opacity-50 blur-3xl"></div>
                </div>
            </div>

            <Header onNavigate={handleNavigate} currentPage={currentPage} />
            <main className="flex-grow">
                {auth.loading ? <div className="flex justify-center items-center h-64"><div className="w-16 h-16 border-4 border-accent-secondary rounded-full border-t-accent animate-spin"></div></div> : renderPage()}
            </main>
            <Footer onNavigate={handleNavigate} />
            <InteractiveModal 
                isOpen={!!modalModule} 
                onClose={handleCloseModal} 
                moduleKey={modalModule}
                onNavigate={handleNavigate}
            />
            <Chatbot />
        </div>
    );
};

export default App;