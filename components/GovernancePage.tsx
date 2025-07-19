import React, { useContext } from 'react';
import { ModuleKey, Page } from '../types';
import ModuleCard from './ModuleCard';
import ReadyToTransform from './ReadyToTransform';
import { AuthContext, hasAccess } from '../contexts/AuthContext';
import { ALL_MODULES } from '../data/modules';

interface GovernancePageProps {
    onModuleClick: (moduleKey: ModuleKey) => void;
    onNavigate: (page: Page) => void;
}

const GovernancePage: React.FC<GovernancePageProps> = ({ onModuleClick, onNavigate }) => {
    const auth = useContext(AuthContext);
    const userPlan = auth.user?.plan || 'free';
    const getModuleInfo = (key: ModuleKey) => ALL_MODULES.find(m => m.moduleKey === key);

    const modules = [
        { moduleKey: 'strategic-risk', onClick: onModuleClick, title: "Đánh giá Rủi ro Chiến lược", description: "Phân tích kế hoạch kinh doanh để xác định các rủi ro tiềm ẩn về thị trường, tài chính và cạnh tranh.", isAiPowered: true },
        { moduleKey: 'training-planner', onClick: onModuleClick, title: "Hoạch định Đào tạo & Phát triển", description: "Xác định các kỹ năng cần thiết và để AI gợi ý các chương trình đào tạo phù hợp cho đội ngũ.", isAiPowered: true },
        { moduleKey: 'decision-framework', onClick: onModuleClick, title: "Khung Ra quyết định", description: "Sử dụng các mô hình phân tích (SWOT, PESTLE) để AI hỗ trợ bạn đưa ra các quyết định chiến lược.", isAiPowered: true },
        { moduleKey: 'competitor-analysis', onClick: onModuleClick, title: "Phân tích Đối thủ Cạnh tranh", description: "Cung cấp thông tin về đối thủ, AI sẽ tóm tắt điểm mạnh, điểm yếu và các cơ hội chiến lược.", isAiPowered: true },
        { moduleKey: 'sales', onClick: onModuleClick, title: "Quản lý Bán hàng", description: "Dự báo doanh số, quản lý pipeline và tối ưu hóa hiệu suất đội ngũ kinh doanh.", isAiPowered: true },
        { moduleKey: 'hrm', onClick: onModuleClick, title: "Quản lý Nhân sự (HRM)", description: "Tự động hóa chấm công, tính lương và quản lý vòng đời nhân viên.", isAiPowered: true },
        { moduleKey: 'crm', onClick: onModuleClick, title: "Quản lý Quan hệ Khách hàng (CRM)", description: "Lưu trữ, phân tích và làm giàu dữ liệu khách hàng để cá nhân hóa trải nghiệm.", isAiPowered: true },
        { moduleKey: 'finance', onClick: onModuleClick, title: "Quản lý Tài chính", description: "Theo dõi dòng tiền, lập ngân sách thông minh và tạo báo cáo tài chính tự động.", isAiPowered: true },
        { moduleKey: 'internal-comms', onClick: onModuleClick, title: "Soạn thảo Truyền thông Nội bộ", description: "Tạo các thông báo, email và bản tin nội bộ chuyên nghiệp để giữ cho đội ngũ luôn được cập nhật.", isAiPowered: true },
        { moduleKey: 'budget-proposal', onClick: onModuleClick, title: "Tạo Đề xuất Ngân sách", description: "Dựa trên mục tiêu, AI sẽ giúp bạn soạn thảo một đề xuất ngân sách hợp lý và thuyết phục.", isAiPowered: true },
        { moduleKey: 'goal-setting', onClick: onModuleClick, title: "Thiết lập Mục tiêu (OKR/KPI)", description: "AI hỗ trợ soạn thảo và tinh chỉnh mục tiêu, đảm bảo tính đo lường và khả thi.", isAiPowered: true },
        { moduleKey: 'lead-scoring-assist', onClick: onModuleClick, title: "Trợ lý Chấm điểm Lead", description: "Đề xuất các tiêu chí và trọng số để chấm điểm khách hàng tiềm năng, giúp tập trung vào các lead chất lượng nhất.", isAiPowered: true },
        { moduleKey: 'performance-review', onClick: onModuleClick, title: "Trợ lý Đánh giá Hiệu suất", description: "Soạn thảo các nhận xét đánh giá hiệu suất nhân viên một cách công tâm và mang tính xây dựng.", isAiPowered: true },
        { moduleKey: 'meeting-summary', onClick: onModuleClick, title: "Trợ lý Họp Thông minh", description: "Tự động tóm tắt biên bản họp, xác định các quyết định chính và các mục cần hành động.", isAiPowered: true },
        { moduleKey: 'document-analyzer', onClick: onModuleClick, title: 'Trợ lý Phân tích Tài liệu', description: 'Đặt câu hỏi cho tài liệu của bạn và nhận câu trả lời tức thì.', isAiPowered: true },
        { moduleKey: 'project-planner', onClick: onModuleClick, title: 'Trợ lý Lập kế hoạch Dự án', description: 'Nêu mục tiêu dự án, AI sẽ vạch ra các bước thực hiện chính.', isAiPowered: true },
    ].sort((a, b) => a.title.localeCompare(b.title, 'vi'));

    return (
        <div className="bg-primary animate-fade-in">
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-text-primary">Hệ Điều Hành Doanh Nghiệp Toàn Diện</h1>
                        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Tích hợp mọi hoạt động quản lý vào một nền tảng thông minh duy nhất. Các tính năng có ✨ được hỗ trợ bởi Gemini API. Nhấp vào một module để trải nghiệm.</p>
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

export default GovernancePage;
