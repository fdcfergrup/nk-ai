import { ModuleKey, UserPlan } from '../types';

export interface ModuleInfo {
    moduleKey: ModuleKey;
    title: string;
    description: string;
    isAiPowered: boolean;
    category: 'governance' | 'marketing' | 'operations' | 'utilities' | 'financial-tools';
    requiredPlan: UserPlan;
}

export const ALL_MODULES: ModuleInfo[] = [
    // Governance
    { moduleKey: 'budget-proposal', title: "Tạo Đề xuất Ngân sách", description: "Dựa trên mục tiêu, AI sẽ giúp bạn soạn thảo một đề xuất ngân sách hợp lý và thuyết phục.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'competitor-analysis', title: "Phân tích Đối thủ Cạnh tranh", description: "Cung cấp thông tin về đối thủ, AI sẽ tóm tắt điểm mạnh, điểm yếu và các cơ hội chiến lược.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'decision-framework', title: "Khung Ra quyết định", description: "Sử dụng các mô hình phân tích (SWOT, PESTLE) để AI hỗ trợ bạn đưa ra các quyết định chiến lược.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'document-analyzer', title: 'Trợ lý Phân tích Tài liệu', description: 'Đặt câu hỏi cho tài liệu của bạn và nhận câu trả lời tức thì.', isAiPowered: true, category: 'governance', requiredPlan: 'personal' },
    { moduleKey: 'goal-setting', title: "Thiết lập Mục tiêu (OKR/KPI)", description: "AI hỗ trợ soạn thảo và tinh chỉnh mục tiêu, đảm bảo tính đo lường và khả thi.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'hrm', title: "Quản lý Nhân sự (HRM)", description: "Tự động hóa chấm công, tính lương và quản lý vòng đời nhân viên.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'internal-comms', title: "Soạn thảo Truyền thông Nội bộ", description: "Tạo các thông báo, email và bản tin nội bộ chuyên nghiệp để giữ cho đội ngũ luôn được cập nhật.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'lead-scoring-assist', title: "Trợ lý Chấm điểm Lead", description: "Đề xuất các tiêu chí và trọng số để chấm điểm khách hàng tiềm năng, giúp tập trung vào các lead chất lượng nhất.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'meeting-summary', title: "Trợ lý Họp Thông minh", description: "Tự động tóm tắt biên bản họp, xác định các quyết định chính và các mục cần hành động.", isAiPowered: true, category: 'governance', requiredPlan: 'personal' },
    { moduleKey: 'performance-review', title: "Trợ lý Đánh giá Hiệu suất", description: "Soạn thảo các nhận xét đánh giá hiệu suất nhân viên một cách công tâm và mang tính xây dựng.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'project-planner', title: 'Trợ lý Lập kế hoạch Dự án', description: 'Nêu mục tiêu dự án, AI sẽ vạch ra các bước thực hiện chính.', isAiPowered: true, category: 'governance', requiredPlan: 'personal' },
    { moduleKey: 'crm', title: "Quản lý Quan hệ Khách hàng (CRM)", description: "Lưu trữ, phân tích và làm giàu dữ liệu khách hàng để cá nhân hóa trải nghiệm.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'finance', title: "Quản lý Tài chính", description: "Theo dõi dòng tiền, lập ngân sách thông minh và tạo báo cáo tài chính tự động.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'sales', title: "Quản lý Bán hàng", description: "Dự báo doanh số, quản lý pipeline và tối ưu hóa hiệu suất đội ngũ kinh doanh.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },
    { moduleKey: 'strategic-risk', title: "Đánh giá Rủi ro Chiến lược", description: "Phân tích kế hoạch kinh doanh để xác định các rủi ro tiềm ẩn về thị trường, tài chính và cạnh tranh.", isAiPowered: true, category: 'governance', requiredPlan: 'enterprise' },
    { moduleKey: 'training-planner', title: "Hoạch định Đào tạo & Phát triển", description: "Xác định các kỹ năng cần thiết và để AI gợi ý các chương trình đào tạo phù hợp cho đội ngũ.", isAiPowered: true, category: 'governance', requiredPlan: 'team' },

    // Marketing
    { moduleKey: 'ab-test-ideas', title: "Gợi ý Ý tưởng A/B Test", description: "Nêu yếu tố cần test, AI sẽ gợi ý các phương án để thử nghiệm.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'ad-copy-generator', title: 'Trợ lý Tạo Nội dung Quảng cáo', description: 'Cung cấp thông tin, AI sẽ tạo các phương án quảng cáo sáng tạo.', isAiPowered: true, category: 'marketing', requiredPlan: 'personal' },
    { moduleKey: 'ads', title: "Quảng cáo Online", description: "Gợi ý kênh và nhóm mục tiêu cho chiến dịch quảng cáo.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'affiliate-email', title: "Soạn Email Mời Hợp tác Affiliate", description: "Soạn thảo email chuyên nghiệp để mời các đối tác tham gia chương trình affiliate.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'analytics', title: "Phân tích Dữ liệu", description: "Diễn giải dữ liệu marketing và đưa ra nhận định chiến lược.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'brand-voice', title: "Định hình Tông giọng Thương hiệu", description: "AI giúp định nghĩa các thuộc tính chính trong tông giọng của bạn.", isAiPowered: true, category: 'marketing', requiredPlan: 'personal' },
    { moduleKey: 'competitor-ad-analysis', title: "Phân tích Mẫu quảng cáo Đối thủ", description: "Dán nội dung quảng cáo của đối thủ để AI phân tích.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'content-strategy', title: "Hoạch định Chiến lược Nội dung", description: "AI đề xuất các chủ đề và định dạng nội dung chính dựa trên đối tượng và mục tiêu của bạn.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'email', title: "Tiếp thị Email", description: "Soạn thảo các chiến dịch email được cá nhân hóa.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'event', title: "Quản lý Sự kiện", description: "Lập kế hoạch và danh sách công việc cho sự kiện.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'influencer-discovery', title: "Gợi ý Influencer/KOL", description: "Nhập lĩnh vực của bạn, AI sẽ gợi ý các loại influencer phù hợp.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'journey-mapper', title: "Vẽ Hành trình Khách hàng", description: "AI phác thảo các điểm chạm chính trong hành trình khách hàng.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'lead', title: "Quản lý Lead", description: "Chấm điểm và đề xuất hành động nuôi dưỡng khách hàng tiềm năng.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'market-research-qs', title: "Tạo Câu hỏi Nghiên cứu Thị trường", description: "AI tạo bộ câu hỏi khảo sát để tìm hiểu về khách hàng.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'content', title: "Tiếp thị Nội dung", description: "Lên ý tưởng và dàn bài cho blog, video, ebook.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'persona-generator', title: "Xây dựng Chân dung Khách hàng", description: "Mô tả khách hàng mục tiêu, AI sẽ tạo một chân dung chi tiết (persona).", isAiPowered: true, category: 'marketing', requiredPlan: 'personal' },
    { moduleKey: 'pr-outreach', title: "Soạn Email PR/Báo chí", description: "Soạn thảo email chuyên nghiệp để gửi tới các nhà báo, biên tập viên.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'product-naming', title: "Gợi ý Tên Sản phẩm", description: "Mô tả sản phẩm, AI sẽ gợi ý các tên gọi sáng tạo.", isAiPowered: true, category: 'marketing', requiredPlan: 'personal' },
    { moduleKey: 'seo-keyword-cluster', title: "Phân nhóm Từ khóa SEO", description: "Cung cấp từ khóa chính, AI sẽ gợi ý các nhóm từ khóa liên quan.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'seo-optimizer', title: 'Trợ lý Tối ưu SEO', description: 'Nhập chủ đề bài viết để nhận gợi ý từ khóa và mô tả meta hấp dẫn.', isAiPowered: true, category: 'marketing', requiredPlan: 'personal' },
    { moduleKey: 'slogan-generator', title: "Tạo Slogan/Tagline", description: "Cung cấp giá trị cốt lõi, AI sẽ tạo các slogan hấp dẫn.", isAiPowered: true, category: 'marketing', requiredPlan: 'personal' },
    { moduleKey: 'social-calendar', title: "Lên Lịch Mạng Xã Hội", description: "Cung cấp chủ đề, AI sẽ tạo lịch đăng bài cho một tuần.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'social', title: "Mạng xã hội", description: "Lên lịch và tạo nội dung cho các nền tảng mạng xã hội.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'testimonial-polisher', title: "Biên tập Feedback Khách hàng", description: "AI giúp chỉnh sửa feedback thô thành một lời chứng thực thuyết phục.", isAiPowered: true, category: 'marketing', requiredPlan: 'personal' },
    { moduleKey: 'video', title: "Tiếp thị Video", description: "Viết kịch bản và ý tưởng cho video marketing.", isAiPowered: true, category: 'marketing', requiredPlan: 'team' },
    { moduleKey: 'webinar-topic-ideas', title: "Gợi ý Chủ đề Webinar/Podcast", description: "Cung cấp lĩnh vực chuyên môn, AI sẽ gợi ý các chủ đề hấp dẫn.", isAiPowered: true, category: 'marketing', requiredPlan: 'personal' },

    // Operations
    { moduleKey: 'asset', title: "Quản lý Tài sản", description: "Đề xuất lịch bảo trì, theo dõi và tối ưu hóa vòng đời tài sản.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'cost-reduction-ideas', title: "Gợi ý Cắt giảm Chi phí", description: "Mô tả lĩnh vực hoạt động, AI sẽ đưa ra các ý tưởng sáng tạo để cắt giảm chi phí vận hành.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'data-anomaly-detector', title: 'Phát Hiện Bất Thường Dữ Liệu', description: 'AI phân tích dữ liệu để tìm ra các điểm bất thường (dùng dữ liệu mẫu).', isAiPowered: false, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'facility-layout-optimizer', title: "Tối ưu Bố trí Mặt bằng", description: "Mô tả bố trí nhà xưởng/kho hiện tại, AI sẽ gợi ý các thay đổi để tăng hiệu quả.", isAiPowered: true, category: 'operations', requiredPlan: 'enterprise' },
    { moduleKey: 'incident-report-analyzer', title: "Phân tích Báo cáo Sự cố", description: "Dán nhiều báo cáo sự cố, AI sẽ phân tích để tìm ra các xu hướng và nguyên nhân gốc rễ.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'inventory-forecasting', title: "Dự báo Tồn kho", description: "Cung cấp dữ liệu bán hàng lịch sử, AI sẽ dự báo nhu cầu tồn kho cho giai đoạn tiếp theo.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'inventory-optimizer', title: 'Trợ lý Tối ưu Tồn kho', description: 'Nhập thông tin sản phẩm, AI sẽ gợi ý điểm đặt hàng lại tối ưu.', isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'kpi-dashboard-designer', title: "Thiết kế Dashboard KPI", description: "Cho biết bộ phận hoặc mục tiêu, AI sẽ đề xuất các KPI quan trọng nhất cần theo dõi.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'logistics-planner', title: "Hoạch định Logistics", description: "Nhập danh sách điểm giao hàng, AI sẽ đề xuất tuyến đường vận chuyển tối ưu.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'maintenance', title: "Quản lý Bảo trì", description: "Tạo phiếu yêu cầu công việc và gợi ý lịch bảo trì.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'process-optimization', title: "Tối ưu hóa Quy trình", description: "Mô tả một quy trình làm việc, AI sẽ phân tích và chỉ ra các điểm nghẽn, đề xuất cải tiến.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'quality', title: "Quản lý Chất lượng", description: "Đề xuất phương pháp phân tích nguyên nhân gốc rễ cho các vấn đề chất lượng.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'risk', title: "Quản lý Rủi ro", description: "Nhận diện và đề xuất phương án giảm thiểu rủi ro vận hành.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'safety-protocol-writer', title: "Soạn thảo Quy trình An toàn", description: "Mô tả một công việc hoặc khu vực, AI sẽ giúp soạn thảo một bộ quy trình an toàn lao động chi tiết.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'supplier-evaluation', title: "Đánh giá Nhà cung cấp", description: "Tạo một khung tiêu chí chi tiết để đánh giá và lựa chọn các nhà cung cấp tiềm năng.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'supply-chain', title: "Chuỗi cung ứng", description: "Phân tích rủi ro và tối ưu hóa chuỗi cung ứng.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },
    { moduleKey: 'workflow-automation', title: "Tự động hóa Luồng công việc", description: "Mô tả một luồng công việc lặp lại, AI sẽ xác định các bước có thể được tự động hóa.", isAiPowered: true, category: 'operations', requiredPlan: 'team' },

    // Utilities
    { moduleKey: 'argument-builder', title: 'Xây dựng Luận điểm', description: 'AI giúp bạn củng cố một quan điểm bằng cách cung cấp các luận điểm hỗ trợ.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'brand-name-generator', title: 'Tạo Tên Thương hiệu', description: 'Gợi ý các tên thương hiệu độc đáo dựa trên giá trị và lĩnh vực của bạn.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'brand-story-generator', title: 'Kể Chuyện Thương hiệu', description: 'AI giúp bạn xây dựng một câu chuyện thương hiệu hấp dẫn và có ý nghĩa.', isAiPowered: true, category: 'utilities', requiredPlan: 'team' },
    { moduleKey: 'competitor-keyword', title: 'Nghiên cứu Từ khóa Đối thủ', description: 'Phân tích URL của đối thủ để tìm các từ khóa SEO tiềm năng.', isAiPowered: true, category: 'utilities', requiredPlan: 'team' },
    { moduleKey: 'contract-drafter', title: 'Soạn thảo Hợp đồng', description: 'AI hỗ trợ tạo các mẫu hợp đồng đơn giản dựa trên các điều khoản chính.', isAiPowered: true, category: 'utilities', requiredPlan: 'team' },
    { moduleKey: 'convert', title: 'Chuyển đổi File', description: 'Nhanh chóng chuyển đổi giữa các định dạng file (Mô phỏng).', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'cornell-notes', title: 'Tạo Ghi chú Cornell', description: 'AI giúp bạn sắp xếp ghi chú theo phương pháp Cornell hiệu quả.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'currency-converter', title: 'Chuyển đổi Tiền tệ', description: 'Chuyển đổi nhanh giữa các loại tiền tệ phổ biến.', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'email-assistant', title: 'Trợ lý Viết Email', description: 'Soạn thảo email chuyên nghiệp cho mọi tình huống.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'email-classifier', title: 'Phân loại Email', description: 'AI phân loại email (khẩn cấp, công việc, v.v.) và đề xuất hành động.', isAiPowered: true, category: 'utilities', requiredPlan: 'team' },
    { moduleKey: 'excel-formula', title: 'Tạo Công thức Excel', description: 'Mô tả yêu cầu, AI sẽ tạo công thức Excel/Google Sheets.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'fake-data-generator', title: 'Tạo Dữ liệu Mẫu', description: 'Tạo nhanh dữ liệu mẫu (JSON) cho mục đích thử nghiệm.', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'grammar-checker', title: 'Sửa lỗi Chính tả & Ngữ pháp', description: 'AI kiểm tra và sửa lỗi chính tả, ngữ pháp cho văn bản của bạn.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'headline', title: 'Phân tích Tiêu đề', description: 'Phân tích và chấm điểm tiêu đề của bạn để tăng tỷ lệ nhấp.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'idea-brainstormer', title: 'Brainstorm Ý tưởng', description: 'Nhập một chủ đề, AI sẽ tạo ra một loạt các ý tưởng và góc nhìn liên quan.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'info-extractor', title: 'Trích xuất Thông tin', description: 'Tự động trích xuất email, số điện thoại, địa chỉ từ văn bản.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'interview-questions', title: 'Tạo Câu hỏi Phỏng vấn', description: 'Tạo bộ câu hỏi phỏng vấn chuyên sâu cho bất kỳ vị trí nào.', isAiPowered: true, category: 'utilities', requiredPlan: 'team' },
    { moduleKey: 'meeting-agenda', title: 'Tạo Agenda Họp', description: 'Tự động tạo chương trình nghị sự chi tiết cho cuộc họp.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'mind-map-generator', title: 'Tạo Sơ đồ Tư duy', description: 'Phác thảo ý tưởng dưới dạng sơ đồ tư duy có cấu trúc.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'out-of-office-generator', title: 'Tạo Tin nhắn Vắng mặt', description: 'Soạn thư trả lời tự động chuyên nghiệp khi bạn vắng mặt.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'palette', title: 'Tạo Bảng màu', description: 'Tạo các bảng màu hài hòa cho thiết kế của bạn.', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'password', title: 'Tạo Mật khẩu', description: 'Tạo mật khẩu mạnh và an toàn chỉ với một cú nhấp chuột.', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'personal-swot', title: 'Phân tích SWOT Cá nhân', description: 'AI giúp bạn thực hiện phân tích SWOT để phát triển bản thân.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'pomodoro-timer', title: 'Đồng hồ Pomodoro', description: 'Quản lý thời gian làm việc tập trung theo phương pháp Pomodoro.', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'presentation-outline', title: 'Tạo Dàn ý Thuyết trình', description: 'AI giúp bạn tạo dàn ý chuyên nghiệp cho bài thuyết trình.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'product-description', title: 'Viết Mô tả Sản phẩm', description: 'Tạo mô tả sản phẩm hấp dẫn và thuyết phục từ các gạch đầu dòng.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'project-name-generator', title: 'Gợi ý Tên Dự án', description: 'Tạo các tên dự án, sản phẩm, hoặc chiến dịch sáng tạo.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'qr-generator', title: 'Tạo mã QR', description: 'Tạo mã QR cho URL, văn bản, thông tin liên hệ một cách dễ dàng.', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'quick-report-generator', title: 'Tạo Báo cáo Nhanh', description: 'Chuyển đổi dữ liệu thô thành một bản tường thuật báo cáo ngắn gọn.', isAiPowered: true, category: 'utilities', requiredPlan: 'team' },
    { moduleKey: 'quote-finder', title: 'Tìm kiếm Trích dẫn', description: 'Tìm các câu trích dẫn truyền cảm hứng hoặc phù hợp theo chủ đề.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'regex-generator', title: 'Tạo Biểu thức Regex', description: 'Tạo biểu thức chính quy (Regex) từ mô tả bằng ngôn ngữ tự nhiên.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'review-responder', title: 'Phản hồi Đánh giá', description: 'Soạn thảo các câu trả lời chuyên nghiệp và đồng cảm cho đánh giá của khách hàng.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'sentence-rephraser', title: 'Diễn đạt lại Câu', description: 'Cải thiện văn phong bằng cách diễn đạt lại câu theo nhiều cách khác nhau.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'sentiment-analysis', title: 'Phân tích Cảm xúc', description: 'Phân tích và xác định sắc thái tình cảm trong văn bản.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'speech-writer', title: 'Trợ lý Viết Bài phát biểu', description: 'Soạn dàn ý hoặc một bài phát biểu ngắn cho mọi sự kiện.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'summarize', title: 'Tóm tắt Văn bản', description: 'Dán văn bản để AI tóm tắt các điểm chính.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'support-script-generator', title: 'Tạo Kịch bản Hỗ trợ', description: 'Soạn thảo kịch bản chăm sóc khách hàng cho các tình huống phổ biến.', isAiPowered: true, category: 'utilities', requiredPlan: 'team' },
    { moduleKey: 'task-checklist', title: 'Tạo Checklist Công việc', description: 'AI giúp bạn chia nhỏ mục tiêu thành các danh sách công việc chi tiết.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'text-simplifier', title: 'Đơn giản hóa Văn bản', description: 'Biến các văn bản kỹ thuật hoặc pháp lý phức tạp thành ngôn ngữ dễ hiểu.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'text-to-json', title: 'Chuyển Văn bản sang JSON', description: 'Chuyển đổi dữ liệu văn bản phi cấu trúc thành định dạng JSON.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'thank-you-note-writer', title: 'Viết Thư Cảm ơn', description: 'Soạn thảo các lá thư cảm ơn chân thành và chuyên nghiệp.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'tos-summarizer', title: 'Tóm tắt Điều khoản Dịch vụ', description: 'Rút gọn các điều khoản dịch vụ dài dòng thành các điểm chính cần lưu ý.', isAiPowered: true, category: 'utilities', requiredPlan: 'team' },
    { moduleKey: 'translate-improve', title: 'Dịch và Cải thiện Văn bản', description: 'Dịch thuật và tối ưu hóa văn bản sang ngôn ngữ khác cho mục đích công việc.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'unit-converter', title: 'Chuyển đổi Đơn vị', description: 'Chuyển đổi giữa các đơn vị đo lường khác nhau.', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'word-counter', title: 'Đếm Từ & Ký tự', description: 'Dán văn bản của bạn vào để đếm số từ và ký tự chính xác.', isAiPowered: false, category: 'utilities', requiredPlan: 'personal' },
    { moduleKey: 'youtube-summarizer', title: 'Tóm tắt Video YouTube', description: 'Dán bản ghi (transcript) của video để AI tóm tắt nội dung chính.', isAiPowered: true, category: 'utilities', requiredPlan: 'personal' },

    // Financial Tools
    { moduleKey: 'atr-calculator', title: 'Tính toán ATR', description: 'Đo lường sự biến động của thị trường bằng chỉ số Average True Range.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'bollinger-bands', title: 'Phân tích Dải Bollinger', description: 'Xác định các vùng quá mua/quá bán và biến động giá.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'break-even-analysis', title: 'Phân tích Điểm hòa vốn', description: 'AI phân tích điểm hòa vốn dựa trên chi phí cố định, chi phí biến đổi và giá bán.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'candlestick-pattern', title: 'Nhận diện Mẫu nến', description: 'AI giúp nhận diện các mẫu hình nến và ý nghĩa tín hiệu kỹ thuật.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'crypto-onchain-interpreter', title: "Trợ lý Diễn giải Dữ liệu On-chain", description: "Diễn giải các chỉ số on-chain phức tạp và ý nghĩa của chúng đối với thị trường crypto.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'enterprise' },
    { moduleKey: 'dcf-valuation', title: 'Trợ lý Định giá DCF', description: 'Ước tính giá trị nội tại của một công ty bằng mô hình Dòng tiền Chiết khấu.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'earnings-call-summarizer', title: "Trợ lý Tóm tắt Báo cáo Thu nhập", description: "Tóm tắt các điểm chính từ báo cáo thu nhập và nhận định của ban lãnh đạo.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'economic-event-analyzer', title: "Trợ lý Phân tích Tác động Sự kiện Kinh tế", description: "AI phân tích tác động của các sự kiện kinh tế vĩ mô lên thị trường tài chính.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'eps-calculator', title: 'Tính toán EPS', description: 'Tính toán Lợi nhuận trên mỗi cổ phiếu (Earnings Per Share) của công ty.', isAiPowered: false, category: 'financial-tools', requiredPlan: 'personal' },
    { moduleKey: 'fibonacci-retracement', title: 'Phân tích Fibonacci Retracement', description: 'Xác định các mức hỗ trợ và kháng cự tiềm năng dựa trên tỷ lệ Fibonacci.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'ipo-analysis-assistant', title: "Trợ lý Phân tích IPO", description: "Phân tích nhanh các điểm mạnh và rủi ro của một công ty sắp IPO.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'enterprise' },
    { moduleKey: 'investment-roi', title: 'Tính toán ROI Đầu tư', description: 'Đo lường Tỷ suất Hoàn vốn (Return on Investment) cho các khoản đầu tư.', isAiPowered: false, category: 'financial-tools', requiredPlan: 'personal' },
    { moduleKey: 'macd-calculator', title: 'Tính toán MACD', description: 'Phân tích chỉ báo hội tụ/phân kỳ của đường trung bình động (MACD).', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'market-sentiment-analyzer', title: "Trợ lý Phân tích Tâm lý Thị trường", description: "Đánh giá tâm lý thị trường chung (bullish/bearish) đối với một cổ phiếu.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'moving-average', title: 'Phân tích Trung bình Động', description: 'Phân tích xu hướng giá bằng các đường trung bình động (SMA, EMA).', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'npv-irr-calculator', title: 'Tính toán NPV & IRR', description: 'Đánh giá khả năng sinh lời của dự án đầu tư qua NPV và IRR.', isAiPowered: false, category: 'financial-tools', requiredPlan: 'personal' },
    { moduleKey: 'obv-calculator', title: 'Phân tích On-Balance Volume (OBV)', description: 'Sử dụng khối lượng giao dịch để dự đoán sự thay đổi giá.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'options-strategy-suggester', title: "Trợ lý Gợi ý Chiến lược Quyền chọn", description: "Gợi ý các chiến lược giao dịch quyền chọn (Options) phù hợp với nhận định thị trường.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'enterprise' },
    { moduleKey: 'portfolio-allocator', title: 'Trợ lý Phân bổ Danh mục', description: 'AI gợi ý cách phân bổ tài sản trong danh mục đầu tư dựa trên khẩu vị rủi ro.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'portfolio-diversification-checker', title: "Trợ lý Kiểm tra Đa dạng hóa Danh mục", description: "Kiểm tra mức độ đa dạng hóa của danh mục và nhận gợi ý cải thiện.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'ratio-analysis', title: 'Trợ lý Phân tích Tỷ số Tài chính', description: 'AI phân tích và diễn giải các tỷ số tài chính quan trọng của doanh nghiệp.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'risk-reward-calculator', title: "Trợ lý Phân tích Tỷ lệ Rủi ro/Lợi nhuận", description: "Tính toán và phân tích tỷ lệ Rủi ro/Lợi nhuận cho một thiết lập giao dịch.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'rsi-calculator', title: 'Tính toán RSI', description: 'Đo lường sức mạnh tương đối của giá để xác định tín hiệu quá mua/quá bán.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'stochastic-oscillator', title: 'Phân tích Stochastic Oscillator', description: 'Xác định động lượng giá và các điểm đảo chiều tiềm năng.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'support-resistance', title: 'Xác định Hỗ trợ & Kháng cự', description: 'AI giúp xác định các vùng giá hỗ trợ và kháng cự quan trọng trên biểu đồ.', isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'technical-pattern-screener', title: "Trợ lý Sàng lọc Mẫu hình Kỹ thuật", description: "Nhận diện các mẫu hình kỹ thuật tiềm năng (vai-đầu-vai, tam giác, v.v.) trên biểu đồ.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'enterprise' },
    { moduleKey: 'trading-psychology-coach', title: "Huấn luyện viên Tâm lý Giao dịch", description: "Nhận lời khuyên từ AI để cải thiện các vấn đề tâm lý trong giao dịch.", isAiPowered: true, category: 'financial-tools', requiredPlan: 'premium' },
    { moduleKey: 'wacc-calculator', title: 'Tính toán WACC', description: 'Tính toán Chi phí sử dụng vốn bình quân gia quyền (WACC) của doanh nghiệp.', isAiPowered: false, category: 'financial-tools', requiredPlan: 'personal' },
];

// Group modules by category
export const CATEGORIZED_MODULES = ALL_MODULES.reduce((acc, module) => {
    if (!acc[module.category]) {
        acc[module.category] = [];
    }
    acc[module.category].push(module);
    // Sort modules within each category alphabetically by title
    acc[module.category].sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    return acc;
}, {} as Record<ModuleInfo['category'], ModuleInfo[]>);