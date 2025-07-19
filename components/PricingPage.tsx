import React, { useState } from 'react';
import { Page } from '../types';

interface PricingCardProps {
    planName: string;
    price: string;
    priceDescription: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
    onButtonClick: () => void;
    isYearly: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ planName, price, priceDescription, features, isPopular, buttonText, onButtonClick, isYearly }) => {
    const isTextPrice = price.toLowerCase().includes('liên hệ');
    const priceFontSize = isTextPrice || price.length > 8 ? 'text-4xl' : 'text-5xl';
    
    return (
        <div className={`relative rounded-2xl p-8 border transition-all duration-300 flex flex-col overflow-hidden animate-fade-in-up ${isPopular ? 'bg-secondary shadow-2xl shadow-accent/20 border-accent/70' : 'bg-secondary/40 border-white/10 hover:border-white/20 hover:shadow-xl hover:-translate-y-2'}`}>
           {isPopular && <div className="absolute top-0 right-0 h-16 w-16">
             <div className="absolute transform rotate-45 bg-accent text-center text-primary font-semibold py-1 right-[-34px] top-[32px] w-[170px]">
                Phổ biến
            </div>
           </div>}
           
            <div className="flex-shrink-0">
                <h3 className={`font-bold font-heading text-2xl text-center mb-2 ${isPopular ? 'text-accent' : 'text-text-primary'}`}>{planName}</h3>
                
                <div className="text-center flex flex-col justify-center my-6 h-24">
                    <p className={`${priceFontSize} font-bold font-mono mb-1 ${isPopular ? 'text-white' : 'text-text-primary'}`}>{price}</p>
                    <p className={`text-sm ${isPopular ? 'text-text-primary' : 'text-text-secondary'}`}>{priceDescription}</p>
                </div>
            </div>

            <ul className={`space-y-4 my-8 flex-grow ${isPopular ? 'text-text-primary' : 'text-text-secondary'}`}>
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                         <svg className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${isPopular ? 'text-accent' : 'text-green-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="flex-shrink-0 mt-auto">
                <button
                    onClick={onButtonClick}
                    className={`w-full font-bold py-3 px-6 rounded-lg transition-colors ${isPopular ? 'bg-accent hover:bg-accent-dark text-primary shadow-lg shadow-accent/20' : 'bg-white/10 text-text-primary hover:bg-white/20'}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};


const PricingPage: React.FC<{onNavigate: (page: Page) => void}> = ({onNavigate}) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const handleContact = () => {
        alert("Vui lòng liên hệ qua Hotline: 0817 477 788 để được tư vấn chi tiết.");
    };

    const plans = [
        {
            name: 'Cá nhân',
            monthlyPrice: '500.000',
            yearlyPrice: '5.000.000',
            monthlyDesc: 'VNĐ / tháng',
            yearlyDesc: 'VNĐ / năm',
            features: [
                'Dành cho 1 người dùng',
                'Truy cập đầy đủ Tiện ích Văn phòng',
                'Giới hạn số lượng yêu cầu AI',
                'Hỗ trợ cộng đồng',
            ],
            buttonText: "Liên hệ Sales",
            onClick: handleContact,
        },
        {
            name: 'Premium',
            monthlyPrice: '600.000',
            yearlyPrice: '6.000.000',
            monthlyDesc: 'VNĐ / tháng',
            yearlyDesc: 'VNĐ / năm',
            features: [
                'Dành cho 1 người dùng',
                'Truy cập đầy đủ Tiện ích Tài chính',
                'Tăng giới hạn yêu cầu AI',
                'Tất cả tính năng gói Cá nhân',
            ],
            buttonText: "Liên hệ Sales",
            onClick: handleContact,
        },
        {
            name: 'Đội nhóm',
            monthlyPrice: '1.000.000',
            yearlyPrice: '10.000.000',
            monthlyDesc: 'VNĐ / tháng / mỗi 5 người dùng',
            yearlyDesc: 'VNĐ / năm',
            isPopular: true,
            features: [
                'Tối đa 5 người dùng',
                'Truy cập module Quản trị, Marketing & Vận hành',
                'Giới hạn yêu cầu AI cao hơn',
                'Tất cả tính năng của gói Premium',
                'Hỗ trợ ưu tiên qua Hotline',
            ],
            buttonText: "Liên hệ Sales",
            onClick: handleContact,
        },
        {
            name: 'Doanh nghiệp',
            monthlyPrice: 'Liên hệ',
            yearlyPrice: 'Liên hệ',
            monthlyDesc: 'Giải pháp & giá tùy chỉnh',
            yearlyDesc: 'Hợp đồng và hỗ trợ chuyên sâu',
            features: [
                'Không giới hạn người dùng',
                'Số lượng yêu cầu AI không giới hạn',
                'Tất cả tính năng của gói Đội nhóm',
                'Tùy chỉnh module & tích hợp theo yêu cầu',
                'Hỗ trợ kỹ thuật chuyên sâu & SLA',
            ],
            buttonText: "Liên hệ Sales",
            onClick: handleContact,
        },
    ];

    return (
        <div className="bg-primary py-16 md:py-24 animate-fade-in">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-text-primary">Bảng giá Linh hoạt cho Mọi Quy mô</h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Chọn gói phù hợp nhất với nhu cầu của bạn và bắt đầu hành trình chuyển đổi số cùng NK AI.</p>
                </div>
                
                <div className="flex justify-center items-center mb-12 space-x-4 animate-fade-in-up">
                    <span className={`font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-text-primary' : 'text-text-secondary'}`}>Thanh toán theo tháng</span>
                    <div className="relative inline-flex items-center cursor-pointer p-1 rounded-full bg-secondary border border-white/10" onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}>
                        <span className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-accent transition-transform duration-300 ease-in-out ${billingCycle === 'yearly' ? 'translate-x-full' : 'translate-x-0'}`}></span>
                        <div className="px-5 py-1 text-sm rounded-full z-10">Tháng</div>
                        <div className="px-5 py-1 text-sm rounded-full z-10">Năm</div>
                    </div>
                     <span className={`font-semibold transition-colors duration-300 ${billingCycle === 'yearly' ? 'text-text-primary' : 'text-text-secondary'}`}>
                        Thanh toán theo năm
                        <span className="ml-2 bg-green-500/10 text-green-400 text-xs font-bold px-2.5 py-1 rounded-full">Tiết kiệm 2 tháng</span>
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            planName={plan.name}
                            price={billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                            priceDescription={billingCycle === 'monthly' ? plan.monthlyDesc : plan.yearlyDesc}
                            features={plan.features}
                            isPopular={plan.isPopular}
                            buttonText={plan.buttonText}
                            onButtonClick={plan.onClick}
                            isYearly={billingCycle === 'yearly'}
                        />
                    ))}
                </div>

                <div className="text-center mt-16 text-text-secondary">
                    <p>Cần một giải pháp đặc thù? <a href="#" onClick={(e) => { e.preventDefault(); handleContact(); }} className="text-accent font-semibold hover:underline">Hãy trò chuyện với đội ngũ sales của chúng tôi</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;