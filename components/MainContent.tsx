
import React from 'react';
import { ModuleKey } from '../types';
import QuanTriTab from './tabs/QuanTriTab';
import TiepThiTab from './tabs/TiepThiTab';
import QuanTriVanHanhTab from './tabs/VanHanhTab';
import TienIchTab from './tabs/TienIchTab';

interface TabButtonProps {
    tabId: string;
    activeTab: string;
    setActiveTab: (tabId: string) => void;
    children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ tabId, activeTab, setActiveTab, children }) => (
    <button
        className={`tab-btn font-semibold text-base md:text-lg py-3 px-2 sm:px-4 md:px-6 rounded-t-lg transition-colors duration-200 ${activeTab === tabId ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}
        onClick={() => setActiveTab(tabId)}
    >
        {children}
    </button>
);

interface MainContentProps {
    activeTab: string;
    setActiveTab: (tabId: string) => void;
    onModuleClick: (moduleKey: ModuleKey) => void;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab, setActiveTab, onModuleClick }) => {
    return (
        <section id="demo" className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold font-heading text-brand-primary">Khám Phá Sức Mạnh Chuyển Đổi của Trợ Lý AI</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Tương tác với các trợ lý AI của chúng tôi để thấy cách NK AI có thể biến đổi hoạt động kinh doanh của bạn. Các tính năng có ✨ được hỗ trợ bởi Gemini API.</p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-wrap justify-center border-b-2 border-gray-200 mb-8 space-x-1 md:space-x-4">
                        <TabButton tabId="quan-tri" activeTab={activeTab} setActiveTab={setActiveTab}>Quản Trị</TabButton>
                        <TabButton tabId="tiep-thi" activeTab={activeTab} setActiveTab={setActiveTab}>Marketing</TabButton>
                        <TabButton tabId="quan-tri-van-hanh" activeTab={activeTab} setActiveTab={setActiveTab}>Quản trị vận hành</TabButton>
                        <TabButton tabId="cong-cu-tien-ich" activeTab={activeTab} setActiveTab={setActiveTab}>Tiện ích văn phòng</TabButton>
                    </div>

                    <div id="tab-content" className="transition-all duration-500">
                        {activeTab === 'quan-tri' && <QuanTriTab onModuleClick={onModuleClick} />}
                        {activeTab === 'tiep-thi' && <TiepThiTab onModuleClick={onModuleClick} />}
                        {activeTab === 'quan-tri-van-hanh' && <QuanTriVanHanhTab onModuleClick={onModuleClick} />}
                        {activeTab === 'cong-cu-tien-ich' && <TienIchTab onModuleClick={onModuleClick} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainContent;