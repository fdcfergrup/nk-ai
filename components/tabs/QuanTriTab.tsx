import React, { useContext } from 'react';
import { ModuleKey } from '../../types';
import DemoCard from '../DemoCard';
import ModuleCard from '../ModuleCard';
import { AuthContext, hasAccess } from '../../contexts/AuthContext';
import { ALL_MODULES } from '../../data/modules';

interface QuanTriTabProps {
    onModuleClick: (moduleKey: ModuleKey) => void;
}

const QuanTriTab: React.FC<QuanTriTabProps> = ({ onModuleClick }) => {
    const auth = useContext(AuthContext);
    const userPlan = auth.user?.plan || 'free';
    const getModuleInfo = (key: ModuleKey) => ALL_MODULES.find(m => m.moduleKey === key);

    const modules = [
        { moduleKey: "strategic-risk", title: "Đánh giá Rủi ro Chiến lược", description: "Phân tích kế hoạch kinh doanh để xác định các rủi ro tiềm ẩn về thị trường, tài chính và cạnh tranh.", isAiPowered: true },
        { moduleKey: "training-planner", title: "Hoạch định Đào tạo & Phát triển", description: "Xác định các kỹ năng cần thiết và để AI gợi ý các chương trình đào tạo phù hợp cho đội ngũ.", isAiPowered: true },
        { moduleKey: "decision-framework", title: "Khung Ra quyết định", description: "Sử dụng các mô hình phân tích (SWOT, PESTLE) để AI hỗ trợ bạn đưa ra các quyết định chiến lược.", isAiPowered: true },
        { moduleKey: "competitor-analysis", title: "Phân tích Đối thủ Cạnh tranh", description: "Cung cấp thông tin về đối thủ, AI sẽ tóm tắt điểm mạnh, điểm yếu và các cơ hội chiến lược.", isAiPowered: true },
        { moduleKey: "sales", title: "Quản lý Bán hàng", description: "Dự báo doanh số, quản lý pipeline và tối ưu hóa hiệu suất đội ngũ kinh doanh.", isAiPowered: true },
        { moduleKey: "hrm", title: "Quản lý Nhân sự (HRM)", description: "Tự động hóa chấm công, tính lương và quản lý vòng đời nhân viên.", isAiPowered: true },
        { moduleKey: "crm", title: "Quản lý Quan hệ Khách hàng (CRM)", description: "Lưu trữ, phân tích và làm giàu dữ liệu khách hàng để cá nhân hóa trải nghiệm.", isAiPowered: true },
        { moduleKey: "finance", title: "Quản lý Tài chính", description: "Theo dõi dòng tiền, lập ngân sách thông minh và tạo báo cáo tài chính tự động.", isAiPowered: true },
        { moduleKey: "internal-comms", title: "Soạn thảo Truyền thông Nội bộ", description: "Tạo các thông báo, email và bản tin nội bộ chuyên nghiệp để giữ cho đội ngũ luôn được cập nhật.", isAiPowered: true },
        { moduleKey: "budget-proposal", title: "Tạo Đề xuất Ngân sách", description: "Dựa trên mục tiêu, AI sẽ giúp bạn soạn thảo một đề xuất ngân sách hợp lý và thuyết phục.", isAiPowered: true },
        { moduleKey: "goal-setting", title: "Thiết lập Mục tiêu (OKR/KPI)", description: "AI hỗ trợ soạn thảo và tinh chỉnh mục tiêu, đảm bảo tính đo lường và khả thi.", isAiPowered: true },
        { moduleKey: "lead-scoring-assist", title: "Trợ lý Chấm điểm Lead", description: "Đề xuất các tiêu chí và trọng số để chấm điểm khách hàng tiềm năng, giúp tập trung vào các lead chất lượng nhất.", isAiPowered: true },
        { moduleKey: "performance-review", title: "Trợ lý Đánh giá Hiệu suất", description: "Soạn thảo các nhận xét đánh giá hiệu suất nhân viên một cách công tâm và mang tính xây dựng.", isAiPowered: true },
        { moduleKey: "meeting-summary", title: "Trợ lý Họp Thông minh", description: "Tự động tóm tắt biên bản họp, xác định các quyết định chính và các mục cần hành động.", isAiPowered: true },
    ].sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    
    return (
        <div className="animate-fade-in">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-primary">Hệ Điều Hành Doanh Nghiệp Toàn Diện</h2>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Tích hợp mọi hoạt động quản lý vào một nền tảng thông minh duy nhất. Nhấp vào một module để trải nghiệm demo AI.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <DemoCard
                    title="Trợ lý Phân tích Tài liệu"
                    description="Đặt câu hỏi cho tài liệu của bạn và nhận câu trả lời tức thì."
                    contextLabel="Nội dung tài liệu (Mẫu):"
                    contextValue="Báo cáo tài chính Quý 4 năm 2024: Doanh thu thuần đạt 15,250 tỷ đồng, tăng 15% YoY. Lợi nhuận sau thuế là 1,850 tỷ đồng, tăng 22% YoY. Biên lợi nhuận gộp cải thiện từ 18.5% lên 20.2%."
                    inputElement="input"
                    inputLabel="Đặt câu hỏi của bạn:"
                    inputPlaceholder="Ví dụ: Tóm tắt các chỉ số chính."
                    buttonText="Yêu cầu AI phân tích"
                    promptTemplate={(input, context) => `Dựa vào tài liệu sau: "${context}". Hãy trả lời câu hỏi sau một cách súc tích: "${input}"`}
                />
                 <DemoCard
                    title="Trợ lý Lập kế hoạch Dự án"
                    description="Nêu mục tiêu dự án, AI sẽ vạch ra các bước thực hiện chính."
                    inputElement="textarea"
                    inputLabel="Mục tiêu dự án:"
                    inputPlaceholder="Ví dụ: Ra mắt website thương mại điện tử mới cho thương hiệu thời trang trong 3 tháng."
                    buttonText="Lập kế hoạch"
                    promptTemplate={(input) => `Với vai trò là một quản lý dự án AI, hãy tạo một kế hoạch chi tiết với các giai đoạn (phases) và các nhiệm vụ chính (key tasks) cho mục tiêu sau: "${input}". Trình bày dưới dạng các gạch đầu dòng có cấu trúc.`}
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {modules.map(module => {
                    const info = getModuleInfo(module.moduleKey as ModuleKey);
                    const requiredPlan = info?.requiredPlan || 'free';
                    const isLocked = !hasAccess(userPlan, requiredPlan);
                    return (<ModuleCard 
                        key={module.moduleKey}
                        moduleKey={module.moduleKey as ModuleKey} 
                        onClick={onModuleClick} 
                        title={module.title} 
                        description={module.description} 
                        isAiPowered={module.isAiPowered} 
                        isLocked={isLocked}
                    />)
                })}
            </div>
        </div>
    );
};

export default QuanTriTab;