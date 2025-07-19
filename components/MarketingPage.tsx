import React, { useContext } from 'react';
import { ModuleKey, Page } from '../types';
import ModuleCard from './ModuleCard';
import ReadyToTransform from './ReadyToTransform';
import { AuthContext, hasAccess } from '../contexts/AuthContext';
import { ALL_MODULES } from '../data/modules';

interface MarketingPageProps {
    onModuleClick: (moduleKey: ModuleKey) => void;
    onNavigate: (page: Page) => void;
}

const MarketingPage: React.FC<MarketingPageProps> = ({ onModuleClick, onNavigate }) => {
    const auth = useContext(AuthContext);
    const userPlan = auth.user?.plan || 'free';
    const getModuleInfo = (key: ModuleKey) => ALL_MODULES.find(m => m.moduleKey === key);

    const modules = [
        { moduleKey: 'testimonial-polisher', title: "Biên tập Feedback Khách hàng", description: "AI giúp chỉnh sửa feedback thô thành một lời chứng thực thuyết phục.", isAiPowered: true },
        { moduleKey: 'brand-voice', title: "Định hình Tông giọng Thương hiệu", description: "AI giúp định nghĩa các thuộc tính chính trong tông giọng của bạn.", isAiPowered: true },
        { moduleKey: 'webinar-topic-ideas', title: "Gợi ý Chủ đề Webinar/Podcast", description: "Cung cấp lĩnh vực chuyên môn, AI sẽ gợi ý các chủ đề hấp dẫn.", isAiPowered: true },
        { moduleKey: 'influencer-discovery', title: "Gợi ý Influencer/KOL", description: "Nhập lĩnh vực của bạn, AI sẽ gợi ý các loại influencer phù hợp.", isAiPowered: true },
        { moduleKey: 'product-naming', title: "Gợi ý Tên Sản phẩm", description: "Mô tả sản phẩm, AI sẽ gợi ý các tên gọi sáng tạo.", isAiPowered: true },
        { moduleKey: 'ab-test-ideas', title: "Gợi ý Ý tưởng A/B Test", description: "Nêu yếu tố cần test, AI sẽ gợi ý các phương án để thử nghiệm.", isAiPowered: true },
        { moduleKey: 'content-strategy', title: "Hoạch định Chiến lược Nội dung", description: "AI đề xuất các chủ đề và định dạng nội dung chính dựa trên đối tượng và mục tiêu của bạn.", isAiPowered: true },
        { moduleKey: 'social-calendar', title: "Lên Lịch Mạng Xã Hội", description: "Cung cấp chủ đề, AI sẽ tạo lịch đăng bài cho một tuần.", isAiPowered: true },
        { moduleKey: 'social', title: "Mạng xã hội", description: "Lên lịch và tạo nội dung cho các nền tảng mạng xã hội.", isAiPowered: true },
        { moduleKey: 'analytics', title: "Phân tích Dữ liệu", description: "Diễn giải dữ liệu marketing và đưa ra nhận định chiến lược.", isAiPowered: true },
        { moduleKey: 'competitor-ad-analysis', title: "Phân tích Mẫu quảng cáo Đối thủ", description: "Dán nội dung quảng cáo của đối thủ để AI phân tích.", isAiPowered: true },
        { moduleKey: 'seo-keyword-cluster', title: "Phân nhóm Từ khóa SEO", description: "Cung cấp từ khóa chính, AI sẽ gợi ý các nhóm từ khóa liên quan.", isAiPowered: true },
        { moduleKey: 'lead', title: "Quản lý Lead", description: "Chấm điểm và đề xuất hành động nuôi dưỡng khách hàng tiềm năng.", isAiPowered: true },
        { moduleKey: 'event', title: "Quản lý Sự kiện", description: "Lập kế hoạch và danh sách công việc cho sự kiện.", isAiPowered: true },
        { moduleKey: 'ads', title: "Quảng cáo Online", description: "Gợi ý kênh và nhóm mục tiêu cho chiến dịch quảng cáo.", isAiPowered: true },
        { moduleKey: 'affiliate-email', title: "Soạn Email Mời Hợp tác Affiliate", description: "Soạn thảo email chuyên nghiệp để mời các đối tác tham gia chương trình affiliate.", isAiPowered: true },
        { moduleKey: 'pr-outreach', title: "Soạn Email PR/Báo chí", description: "Soạn thảo email chuyên nghiệp để gửi tới các nhà báo, biên tập viên.", isAiPowered: true },
        { moduleKey: 'market-research-qs', title: "Tạo Câu hỏi Nghiên cứu Thị trường", description: "AI tạo bộ câu hỏi khảo sát để tìm hiểu về khách hàng.", isAiPowered: true },
        { moduleKey: 'slogan-generator', title: "Tạo Slogan/Tagline", description: "Cung cấp giá trị cốt lõi, AI sẽ tạo các slogan hấp dẫn.", isAiPowered: true },
        { moduleKey: 'email', title: "Tiếp thị Email", description: "Soạn thảo các chiến dịch email được cá nhân hóa.", isAiPowered: true },
        { moduleKey: 'content', title: "Tiếp thị Nội dung", description: "Lên ý tưởng và dàn bài cho blog, video, ebook.", isAiPowered: true },
        { moduleKey: 'video', title: "Tiếp thị Video", description: "Viết kịch bản và ý tưởng cho video marketing.", isAiPowered: true },
        { moduleKey: 'journey-mapper', title: "Vẽ Hành trình Khách hàng", description: "AI phác thảo các điểm chạm chính trong hành trình khách hàng.", isAiPowered: true },
        { moduleKey: 'persona-generator', title: "Xây dựng Chân dung Khách hàng", description: "Mô tả khách hàng mục tiêu, AI sẽ tạo một chân dung chi tiết (persona).", isAiPowered: true },
        { moduleKey: 'seo-optimizer', title: 'Trợ lý Tối ưu SEO', description: 'Nhập chủ đề bài viết để nhận gợi ý từ khóa và mô tả meta hấp dẫn.', isAiPowered: true },
        { moduleKey: 'ad-copy-generator', title: 'Trợ lý Tạo Nội dung Quảng cáo', description: 'Cung cấp thông tin, AI sẽ tạo các phương án quảng cáo sáng tạo.', isAiPowered: true },
    ].sort((a, b) => a.title.localeCompare(b.title, 'vi'));

    return (
        <div className="bg-primary animate-fade-in">
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-text-primary">Trung tâm Chỉ huy Marketing 360°</h1>
                        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Từ chiến lược, nội dung, đến quảng cáo và phân tích, quản lý mọi hoạt động marketing trên một nền tảng duy nhất. Các tính năng có ✨ được hỗ trợ bởi Gemini API.</p>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {modules.map(module => {
                                const info = getModuleInfo(module.moduleKey as ModuleKey);
                                const requiredPlan = info?.requiredPlan || 'free';
                                const isLocked = !hasAccess(userPlan, requiredPlan);
                                return (
                                <ModuleCard
                                    key={module.moduleKey}
                                    moduleKey={module.moduleKey as ModuleKey}
                                    onClick={onModuleClick}
                                    title={module.title}
                                    description={module.description}
                                    isAiPowered={module.isAiPowered}
                                    isLocked={isLocked}
                                />
                            )})}
                        </div>
                    </div>
                </div>
            </section>
            <ReadyToTransform />
        </div>
    );
};

export default MarketingPage;
