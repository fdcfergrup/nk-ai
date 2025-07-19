import React, { useContext } from 'react';
import { ModuleKey, Page } from '../types';
import ModuleCard from './ModuleCard';
import ReadyToTransform from './ReadyToTransform';
import { AuthContext, hasAccess } from '../contexts/AuthContext';
import { ALL_MODULES } from '../data/modules';

interface FinancialToolsPageProps {
    onModuleClick: (moduleKey: ModuleKey) => void;
    onNavigate: (page: Page) => void;
}

const FinancialToolsPage: React.FC<FinancialToolsPageProps> = ({ onModuleClick, onNavigate }) => {
    const auth = useContext(AuthContext);
    const userPlan = auth.user?.plan || 'free';
    const getModuleInfo = (key: ModuleKey) => ALL_MODULES.find(m => m.moduleKey === key);

    const financialModules = [
        { moduleKey: 'atr-calculator', title: 'Tính toán ATR', description: 'Đo lường sự biến động của thị trường bằng chỉ số Average True Range.', isAiPowered: true },
        { moduleKey: 'bollinger-bands', title: 'Phân tích Dải Bollinger', description: 'Xác định các vùng quá mua/quá bán và biến động giá.', isAiPowered: true },
        { moduleKey: 'break-even-analysis', title: 'Phân tích Điểm hòa vốn', description: 'AI phân tích điểm hòa vốn dựa trên chi phí cố định, chi phí biến đổi và giá bán.', isAiPowered: true },
        { moduleKey: 'candlestick-pattern', title: 'Nhận diện Mẫu nến', description: 'AI giúp nhận diện các mẫu hình nến và ý nghĩa tín hiệu kỹ thuật.', isAiPowered: true },
        { moduleKey: 'crypto-onchain-interpreter', title: "Trợ lý Diễn giải Dữ liệu On-chain", description: "Diễn giải các chỉ số on-chain phức tạp và ý nghĩa của chúng đối với thị trường crypto.", isAiPowered: true },
        { moduleKey: 'dcf-valuation', title: 'Định giá DCF', description: 'Ước tính giá trị nội tại của một công ty bằng mô hình Dòng tiền Chiết khấu.', isAiPowered: true },
        { moduleKey: 'earnings-call-summarizer', title: "Trợ lý Tóm tắt Báo cáo Thu nhập", description: "Tóm tắt các điểm chính từ báo cáo thu nhập và nhận định của ban lãnh đạo.", isAiPowered: true },
        { moduleKey: 'economic-event-analyzer', title: "Trợ lý Phân tích Tác động Sự kiện Kinh tế", description: "AI phân tích tác động của các sự kiện kinh tế vĩ mô lên thị trường tài chính.", isAiPowered: true },
        { moduleKey: 'eps-calculator', title: 'Tính toán EPS', description: 'Tính toán Lợi nhuận trên mỗi cổ phiếu (Earnings Per Share) của công ty.', isAiPowered: false },
        { moduleKey: 'fibonacci-retracement', title: 'Phân tích Fibonacci Retracement', description: 'Xác định các mức hỗ trợ và kháng cự tiềm năng dựa trên tỷ lệ Fibonacci.', isAiPowered: true },
        { moduleKey: 'trading-psychology-coach', title: "Huấn luyện viên Tâm lý Giao dịch", description: "Nhận lời khuyên từ AI để cải thiện các vấn đề tâm lý trong giao dịch.", isAiPowered: true },
        { moduleKey: 'ipo-analysis-assistant', title: "Trợ lý Phân tích IPO", description: "Phân tích nhanh các điểm mạnh và rủi ro của một công ty sắp IPO.", isAiPowered: true },
        { moduleKey: 'investment-roi', title: 'Tính toán ROI Đầu tư', description: 'Đo lường Tỷ suất Hoàn vốn (Return on Investment) cho các khoản đầu tư.', isAiPowered: false },
        { moduleKey: 'portfolio-diversification-checker', title: "Trợ lý Kiểm tra Đa dạng hóa Danh mục", description: "Kiểm tra mức độ đa dạng hóa của danh mục và nhận gợi ý cải thiện.", isAiPowered: true },
        { moduleKey: 'macd-calculator', title: 'Tính toán MACD', description: 'Phân tích chỉ báo hội tụ/phân kỳ của đường trung bình động (MACD).', isAiPowered: true },
        { moduleKey: 'market-sentiment-analyzer', title: "Trợ lý Phân tích Tâm lý Thị trường", description: "Đánh giá tâm lý thị trường chung (bullish/bearish) đối với một cổ phiếu.", isAiPowered: true },
        { moduleKey: 'moving-average', title: 'Phân tích Trung bình Động', description: 'Phân tích xu hướng giá bằng các đường trung bình động (SMA, EMA).', isAiPowered: true },
        { moduleKey: 'npv-irr-calculator', title: 'Tính toán NPV & IRR', description: 'Đánh giá khả năng sinh lời của dự án đầu tư qua NPV và IRR.', isAiPowered: false },
        { moduleKey: 'obv-calculator', title: 'Phân tích On-Balance Volume (OBV)', description: 'Sử dụng khối lượng giao dịch để dự đoán sự thay đổi giá.', isAiPowered: true },
        { moduleKey: 'options-strategy-suggester', title: "Trợ lý Gợi ý Chiến lược Quyền chọn", description: "Gợi ý các chiến lược giao dịch quyền chọn (Options) phù hợp với nhận định thị trường.", isAiPowered: true },
        { moduleKey: 'portfolio-allocator', title: 'Trợ lý Phân bổ Danh mục', description: 'AI gợi ý cách phân bổ tài sản trong danh mục đầu tư dựa trên khẩu vị rủi ro.', isAiPowered: true },
        { moduleKey: 'ratio-analysis', title: 'Phân tích Tỷ số Tài chính', description: 'AI phân tích và diễn giải các tỷ số tài chính quan trọng của doanh nghiệp.', isAiPowered: true },
        { moduleKey: 'risk-reward-calculator', title: "Trợ lý Phân tích Tỷ lệ Rủi ro/Lợi nhuận", description: "Tính toán và phân tích tỷ lệ Rủi ro/Lợi nhuận cho một thiết lập giao dịch.", isAiPowered: true },
        { moduleKey: 'rsi-calculator', title: 'Tính toán RSI', description: 'Đo lường sức mạnh tương đối của giá để xác định tín hiệu quá mua/quá bán.', isAiPowered: true },
        { moduleKey: 'stochastic-oscillator', title: 'Phân tích Stochastic Oscillator', description: 'Xác định động lượng giá và các điểm đảo chiều tiềm năng.', isAiPowered: true },
        { moduleKey: 'support-resistance', title: 'Xác định Hỗ trợ & Kháng cự', description: 'AI giúp xác định các vùng giá hỗ trợ và kháng cự quan trọng trên biểu đồ.', isAiPowered: true },
        { moduleKey: 'technical-pattern-screener', title: "Trợ lý Sàng lọc Mẫu hình Kỹ thuật", description: "Nhận diện các mẫu hình kỹ thuật tiềm năng (vai-đầu-vai, tam giác, v.v.) trên biểu đồ.", isAiPowered: true },
        { moduleKey: 'wacc-calculator', title: 'Tính toán WACC', description: 'Tính toán Chi phí sử dụng vốn bình quân gia quyền (WACC) của doanh nghiệp.', isAiPowered: false },
    ].sort((a, b) => a.title.localeCompare(b.title, 'vi'));

    return (
        <div className="bg-primary animate-fade-in">
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-text-primary">Bộ công cụ Tài chính & Đầu tư</h1>
                        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Nâng cao khả năng phân tích và ra quyết định của bạn với các công cụ tài chính được hỗ trợ bởi AI. Các tính năng có ✨ được hỗ trợ bởi Gemini API.</p>
                    </div>

                    <div className="max-w-7xl mx-auto">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {financialModules.map(module => {
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

export default FinancialToolsPage;
