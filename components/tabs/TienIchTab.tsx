import React, { useContext } from 'react';
import { ModuleKey } from '../../types';
import ModuleCard from '../ModuleCard';
import { AuthContext, hasAccess } from '../../contexts/AuthContext';
import { ALL_MODULES } from '../../data/modules';

interface TienIchTabProps {
    onModuleClick: (moduleKey: ModuleKey) => void;
}

const TienIchTab: React.FC<TienIchTabProps> = ({ onModuleClick }) => {
    const auth = useContext(AuthContext);
    const userPlan = auth.user?.plan || 'free';
    const getModuleInfo = (key: ModuleKey) => ALL_MODULES.find(m => m.moduleKey === key);

    const modules = [
        // AI Tools
        { moduleKey: 'contract-drafter', title: 'Soạn thảo Hợp đồng', description: 'AI hỗ trợ tạo các mẫu hợp đồng đơn giản dựa trên các điều khoản chính.', isAiPowered: true },
        { moduleKey: 'product-description', title: 'Viết Mô tả Sản phẩm', description: 'Tạo mô tả sản phẩm hấp dẫn và thuyết phục từ các gạch đầu dòng.', isAiPowered: true },
        { moduleKey: 'review-responder', title: 'Phản hồi Đánh giá', description: 'Soạn thảo các câu trả lời chuyên nghiệp và đồng cảm cho đánh giá của khách hàng.', isAiPowered: true },
        { moduleKey: 'text-simplifier', title: 'Đơn giản hóa Văn bản', description: 'Biến các văn bản kỹ thuật hoặc pháp lý phức tạp thành ngôn ngữ dễ hiểu.', isAiPowered: true },
        { moduleKey: 'argument-builder', title: 'Xây dựng Luận điểm', description: 'AI giúp bạn củng cố một quan điểm bằng cách cung cấp các luận điểm hỗ trợ.', isAiPowered: true },
        { moduleKey: 'brand-name-generator', title: 'Tạo Tên Thương hiệu', description: 'Gợi ý các tên thương hiệu độc đáo dựa trên giá trị và lĩnh vực của bạn.', isAiPowered: true },
        { moduleKey: 'email-classifier', title: 'Phân loại Email', description: 'AI phân loại email (khẩn cấp, công việc, v.v.) và đề xuất hành động.', isAiPowered: true },
        { moduleKey: 'speech-writer', title: 'Trợ lý Viết Bài phát biểu', description: 'Soạn dàn ý hoặc một bài phát biểu ngắn cho mọi sự kiện.', isAiPowered: true },
        { moduleKey: 'thank-you-note-writer', title: 'Viết Thư Cảm ơn', description: 'Soạn thảo các lá thư cảm ơn chân thành và chuyên nghiệp.', isAiPowered: true },
        { moduleKey: 'brand-story-generator', title: 'Kể Chuyện Thương hiệu', description: 'AI giúp bạn xây dựng một câu chuyện thương hiệu hấp dẫn và có ý nghĩa.', isAiPowered: true },
        { moduleKey: 'competitor-keyword', title: 'Nghiên cứu Từ khóa Đối thủ', description: 'Phân tích URL của đối thủ để tìm các từ khóa SEO tiềm năng.', isAiPowered: true },
        { moduleKey: 'tos-summarizer', title: 'Tóm tắt Điều khoản Dịch vụ', description: 'Rút gọn các điều khoản dịch vụ dài dòng thành các điểm chính cần lưu ý.', isAiPowered: true },
        { moduleKey: 'support-script-generator', title: 'Tạo Kịch bản Hỗ trợ', description: 'Soạn thảo kịch bản chăm sóc khách hàng cho các tình huống phổ biến.', isAiPowered: true },
        { moduleKey: 'quick-report-generator', title: 'Tạo Báo cáo Nhanh', description: 'Chuyển đổi dữ liệu thô thành một bản tường thuật báo cáo ngắn gọn.', isAiPowered: true },
        { moduleKey: 'translate-improve', title: 'Dịch và Cải thiện Văn bản', description: 'Dịch thuật và tối ưu hóa văn bản sang ngôn ngữ khác cho mục đích công việc.', isAiPowered: true },
        { moduleKey: 'idea-brainstormer', title: 'Brainstorm Ý tưởng', description: 'Nhập một chủ đề, AI sẽ tạo ra một loạt các ý tưởng và góc nhìn liên quan.', isAiPowered: true },
        { moduleKey: 'quote-finder', title: 'Tìm kiếm Trích dẫn', description: 'Tìm các câu trích dẫn truyền cảm hứng hoặc phù hợp theo chủ đề.', isAiPowered: true },
        { moduleKey: 'summarize', title: 'Tóm tắt Văn bản', description: 'Dán văn bản để AI tóm tắt các điểm chính.', isAiPowered: true },
        { moduleKey: 'email-assistant', title: 'Trợ lý Viết Email', description: 'Soạn thảo email chuyên nghiệp cho mọi tình huống.', isAiPowered: true },
        { moduleKey: 'grammar-checker', title: 'Sửa lỗi Chính tả & Ngữ pháp', description: 'AI kiểm tra và sửa lỗi chính tả, ngữ pháp cho văn bản của bạn.', isAiPowered: true },
        { moduleKey: 'sentence-rephraser', title: 'Diễn đạt lại Câu', description: 'Cải thiện văn phong bằng cách diễn đạt lại câu theo nhiều cách khác nhau.', isAiPowered: true },
        { moduleKey: 'presentation-outline', title: 'Tạo Dàn ý Thuyết trình', description: 'AI giúp bạn tạo dàn ý chuyên nghiệp cho bài thuyết trình.', isAiPowered: true },
        { moduleKey: 'meeting-agenda', title: 'Tạo Agenda Họp', description: 'Tự động tạo chương trình nghị sự chi tiết cho cuộc họp.', isAiPowered: true },
        { moduleKey: 'excel-formula', title: 'Tạo Công thức Excel', description: 'Mô tả yêu cầu, AI sẽ tạo công thức Excel/Google Sheets.', isAiPowered: true },
        { moduleKey: 'regex-generator', title: 'Tạo Biểu thức Regex', description: 'Tạo biểu thức chính quy (Regex) từ mô tả bằng ngôn ngữ tự nhiên.', isAiPowered: true },
        { moduleKey: 'headline', title: 'Phân tích Tiêu đề', description: 'Phân tích và chấm điểm tiêu đề của bạn để tăng tỷ lệ nhấp.', isAiPowered: true },
        { moduleKey: 'interview-questions', title: 'Tạo Câu hỏi Phỏng vấn', description: 'Tạo bộ câu hỏi phỏng vấn chuyên sâu cho bất kỳ vị trí nào.', isAiPowered: true },
        { moduleKey: 'task-checklist', title: 'Tạo Checklist Công việc', description: 'AI giúp bạn chia nhỏ mục tiêu thành các danh sách công việc chi tiết.', isAiPowered: true },
        { moduleKey: 'sentiment-analysis', title: 'Phân tích Cảm xúc', description: 'Phân tích và xác định sắc thái tình cảm trong văn bản.', isAiPowered: true },
        { moduleKey: 'info-extractor', title: 'Trích xuất Thông tin', description: 'Tự động trích xuất email, số điện thoại, địa chỉ từ văn bản.', isAiPowered: true },
        { moduleKey: 'project-name-generator', title: 'Gợi ý Tên Dự án', description: 'Tạo các tên dự án, sản phẩm, hoặc chiến dịch sáng tạo.', isAiPowered: true },
        { moduleKey: 'personal-swot', title: 'Phân tích SWOT Cá nhân', description: 'AI giúp bạn thực hiện phân tích SWOT để phát triển bản thân.', isAiPowered: true },
        { moduleKey: 'out-of-office-generator', title: 'Tạo Tin nhắn Vắng mặt', description: 'Soạn thư trả lời tự động chuyên nghiệp khi bạn vắng mặt.', isAiPowered: true },
        { moduleKey: 'mind-map-generator', title: 'Tạo Sơ đồ Tư duy', description: 'Phác thảo ý tưởng dưới dạng sơ đồ tư duy có cấu trúc.', isAiPowered: true },
        { moduleKey: 'youtube-summarizer', title: 'Tóm tắt Video YouTube', description: 'Dán bản ghi (transcript) của video để AI tóm tắt nội dung chính.', isAiPowered: true },
        { moduleKey: 'text-to-json', title: 'Chuyển Văn bản sang JSON', description: 'Chuyển đổi dữ liệu văn bản phi cấu trúc thành định dạng JSON.', isAiPowered: true },
        { moduleKey: 'cornell-notes', title: 'Tạo Ghi chú Cornell', description: 'AI giúp bạn sắp xếp ghi chú theo phương pháp Cornell hiệu quả.', isAiPowered: true },
        // Non-AI Tools
        { moduleKey: 'password', title: 'Tạo Mật khẩu', description: 'Tạo mật khẩu mạnh và an toàn chỉ với một cú nhấp chuột.', isAiPowered: false },
        { moduleKey: 'qr-generator', title: 'Tạo mã QR', description: 'Tạo mã QR cho URL, văn bản, thông tin liên hệ một cách dễ dàng.', isAiPowered: false },
        { moduleKey: 'word-counter', title: 'Đếm Từ & Ký tự', description: 'Dán văn bản của bạn vào để đếm số từ và ký tự chính xác.', isAiPowered: false },
        { moduleKey: 'palette', title: 'Tạo Bảng màu', description: 'Tạo các bảng màu hài hòa cho thiết kế của bạn.', isAiPowered: false },
        { moduleKey: 'unit-converter', title: 'Chuyển đổi Đơn vị', description: 'Chuyển đổi giữa các đơn vị đo lường khác nhau.', isAiPowered: false },
        { moduleKey: 'currency-converter', title: 'Chuyển đổi Tiền tệ', description: 'Chuyển đổi nhanh giữa các loại tiền tệ phổ biến.', isAiPowered: false },
        { moduleKey: 'pomodoro-timer', title: 'Đồng hồ Pomodoro', description: 'Quản lý thời gian làm việc tập trung theo phương pháp Pomodoro.', isAiPowered: false },
        { moduleKey: 'fake-data-generator', title: 'Tạo Dữ liệu Mẫu', description: 'Tạo nhanh dữ liệu mẫu (JSON) cho mục đích thử nghiệm.', isAiPowered: false },
        { moduleKey: 'convert', title: 'Chuyển đổi File', description: 'Nhanh chóng chuyển đổi giữa các định dạng file (Mô phỏng).', isAiPowered: false },
    ];

    const sortedModules = modules.sort((a, b) => a.title.localeCompare(b.title, 'vi'));

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-primary">Siêu Trợ lý cho Công việc Hàng ngày</h2>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Bộ công cụ AI toàn năng giúp bạn tự động hóa, sáng tạo và tăng tốc mọi tác vụ văn phòng.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedModules.map(module => {
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
                    )
                })}
             </div>
        </div>
    );
};

export default TienIchTab;
