import React from 'react';
import { Page } from '../types';

interface LandingPageProps {
    onNavigate: (page: Page) => void;
}

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-secondary/40 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-accent/10 border border-white/10 hover:border-accent/30 hover:-translate-y-2 transition-all duration-300 text-center animate-fade-in-up">
        <div className="text-5xl mb-6 inline-block bg-clip-text text-transparent bg-gradient-to-br from-accent to-accent-secondary relative">
            {icon}
            <div className="absolute -inset-3 bg-accent/20 blur-xl rounded-full -z-10"></div>
        </div>
        <h3 className="font-bold font-heading text-2xl mb-3 text-text-primary">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative text-white py-32 md:py-48 flex items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden">
                 <div className="absolute inset-0 bg-primary opacity-50 z-0"></div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="max-w-4xl mx-auto animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-b from-text-primary to-text-secondary leading-tight">
                            Khai Phá Sức Mạnh Trí Tuệ Nhân Tạo
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                            Nền tảng AI đột phá dành cho lãnh đạo, giúp tối ưu hóa Quản trị, Tiếp thị và Vận hành để đưa doanh nghiệp của bạn lên tầm cao mới.
                        </p>
                        <button 
                            onClick={() => onNavigate('governance')}
                            className="mt-10 bg-accent text-primary font-bold py-4 px-10 rounded-lg text-lg hover:bg-accent-dark transition-all transform hover:scale-105 shadow-lg shadow-accent/20 hover:shadow-accent/40"
                        >
                            Trải Nghiệm Demo Ngay
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 md:py-24 bg-primary">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary">Giải Pháp Toàn Diện Cho Doanh Nghiệp</h2>
                        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">NK AI cung cấp bộ công cụ thông minh, dễ dàng tích hợp vào quy trình làm việc hàng ngày của bạn.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon="💼"
                            title="Quản Trị Thông Minh"
                            description="Phân tích báo cáo, lập kế hoạch dự án, và quản lý nhân sự hiệu quả với sự trợ giúp từ AI. Ra quyết định nhanh chóng và chính xác hơn."
                        />
                        <FeatureCard
                            icon="📢"
                            title="Tiếp Thị Đột Phá"
                            description="Tự động tạo nội dung quảng cáo, tối ưu SEO, và phân tích chiến dịch. Tiếp cận đúng khách hàng mục tiêu và tối đa hóa ROI."
                        />
                        <FeatureCard
                            icon="⚙️"
                            title="Vận Hành Tối Ưu"
                            description="Dự báo tồn kho, phát hiện bất thường trong dữ liệu, và tối ưu hóa chuỗi cung ứng. Giảm thiểu rủi ro và nâng cao hiệu quả hoạt động."
                        />
                    </div>
                </div>
            </section>
            
            {/* About Section */}
            <section className="bg-secondary py-16 md:py-24">
                <div className="container mx-auto px-6 text-center animate-fade-in-up">
                    <h2 className="text-3xl font-bold font-heading text-text-primary">Về Chúng Tôi</h2>
                     <p className="mt-4 text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
                        <span className="font-semibold text-text-primary">Tầm nhìn của chúng tôi</span> là dân chủ hóa sức mạnh của Trí tuệ Nhân tạo, biến nó thành một công cụ chiến lược, dễ tiếp cận cho mọi doanh nghiệp tại Việt Nam, đặc biệt là các doanh nghiệp vừa và nhỏ (SME).
                        <br/><br/>
                        <span className="font-semibold text-text-primary">NK AI</span> được khai sinh từ trăn trở của đội ngũ chuyên gia công nghệ và tư vấn chiến lược, những người nhận thấy khoảng cách lớn giữa tiềm năng của AI và khả năng ứng dụng thực tế trong quản trị doanh nghiệp. Chúng tôi tin rằng AI không chỉ dành cho các tập đoàn lớn, mà còn là đòn bẩy tăng trưởng đột phá cho bất kỳ ai dám đổi mới.
                        <br/><br/>
                        Nền tảng của chúng tôi được xây dựng trên các công nghệ tiên tiến nhất, với trái tim là <span className="font-semibold text-accent">Gemini API</span> từ Google, đảm bảo khả năng phân tích và tạo sinh thông minh vượt trội. Chúng tôi cam kết mang đến một sản phẩm <span className="font-semibold text-text-primary">An toàn - Tin cậy - Hiệu quả</span>, không chỉ là một phần mềm, mà là một người trợ lý ảo đắc lực, một người đồng hành chiến lược, giúp các nhà lãnh đạo tự tin điều hướng con thuyền doanh nghiệp trong kỷ nguyên số đầy biến động.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;