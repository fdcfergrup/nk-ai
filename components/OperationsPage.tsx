import React, { useContext } from 'react';
import { ModuleKey, Page } from '../types';
import ModuleCard from './ModuleCard';
import ReadyToTransform from './ReadyToTransform';
import { AuthContext, hasAccess } from '../contexts/AuthContext';
import { ALL_MODULES } from '../data/modules';

interface OperationsPageProps {
    onModuleClick: (moduleKey: ModuleKey) => void;
    onNavigate: (page: Page) => void;
}

const OperationsPage: React.FC<OperationsPageProps> = ({ onModuleClick, onNavigate }) => {
    const auth = useContext(AuthContext);
    const userPlan = auth.user?.plan || 'free';
    const getModuleInfo = (key: ModuleKey) => ALL_MODULES.find(m => m.moduleKey === key);
    
    const modules = [
        { moduleKey: 'supply-chain', title: "Chuỗi cung ứng", description: "Phân tích rủi ro và tối ưu hóa chuỗi cung ứng.", isAiPowered: true },
        { moduleKey: 'inventory-forecasting', title: "Dự báo Tồn kho", description: "Cung cấp dữ liệu bán hàng lịch sử, AI sẽ dự báo nhu cầu tồn kho cho giai đoạn tiếp theo.", isAiPowered: true },
        { moduleKey: 'supplier-evaluation', title: "Đánh giá Nhà cung cấp", description: "Tạo một khung tiêu chí chi tiết để đánh giá và lựa chọn các nhà cung cấp tiềm năng.", isAiPowered: true },
        { moduleKey: 'cost-reduction-ideas', title: "Gợi ý Cắt giảm Chi phí", description: "Mô tả lĩnh vực hoạt động, AI sẽ đưa ra các ý tưởng sáng tạo để cắt giảm chi phí vận hành.", isAiPowered: true },
        { moduleKey: 'logistics-planner', title: "Hoạch định Logistics", description: "Nhập danh sách điểm giao hàng, AI sẽ đề xuất tuyến đường vận chuyển tối ưu.", isAiPowered: true },
        { moduleKey: 'incident-report-analyzer', title: "Phân tích Báo cáo Sự cố", description: "Dán nhiều báo cáo sự cố, AI sẽ phân tích để tìm ra các xu hướng và nguyên nhân gốc rễ.", isAiPowered: true },
        { moduleKey: 'maintenance', title: "Quản lý Bảo trì", description: "Tạo phiếu yêu cầu công việc và gợi ý lịch bảo trì.", isAiPowered: true },
        { moduleKey: 'quality', title: "Quản lý Chất lượng", description: "Đề xuất phương pháp phân tích nguyên nhân gốc rễ cho các vấn đề chất lượng.", isAiPowered: true },
        { moduleKey: 'risk', title: "Quản lý Rủi ro", description: "Nhận diện và đề xuất phương án giảm thiểu rủi ro vận hành.", isAiPowered: true },
        { moduleKey: 'asset', title: "Quản lý Tài sản", description: "Đề xuất lịch bảo trì, theo dõi và tối ưu hóa vòng đời tài sản.", isAiPowered: true },
        { moduleKey: 'safety-protocol-writer', title: "Soạn thảo Quy trình An toàn", description: "Mô tả một công việc hoặc khu vực, AI sẽ giúp soạn thảo một bộ quy trình an toàn lao động chi tiết.", isAiPowered: true },
        { moduleKey: 'kpi-dashboard-designer', title: "Thiết kế Dashboard KPI", description: "Cho biết bộ phận hoặc mục tiêu, AI sẽ đề xuất các KPI quan trọng nhất cần theo dõi.", isAiPowered: true },
        { moduleKey: 'facility-layout-optimizer', title: "Tối ưu Bố trí Mặt bằng", description: "Mô tả bố trí nhà xưởng/kho hiện tại, AI sẽ gợi ý các thay đổi để tăng hiệu quả.", isAiPowered: true },
        { moduleKey: 'process-optimization', title: "Tối ưu hóa Quy trình", description: "Mô tả một quy trình làm việc, AI sẽ phân tích và chỉ ra các điểm nghẽn, đề xuất cải tiến.", isAiPowered: true },
        { moduleKey: 'workflow-automation', title: "Tự động hóa Luồng công việc", description: "Mô tả một luồng công việc lặp lại, AI sẽ xác định các bước có thể được tự động hóa.", isAiPowered: true },
        { moduleKey: 'inventory-optimizer', title: 'Trợ lý Tối ưu Tồn kho', description: 'Nhập thông tin sản phẩm, AI sẽ gợi ý điểm đặt hàng lại tối ưu.', isAiPowered: true },
        { moduleKey: 'data-anomaly-detector', title: 'Phát Hiện Bất Thường Dữ Liệu', description: 'AI phân tích dữ liệu để tìm ra các điểm bất thường (dùng dữ liệu mẫu).', isAiPowered: false },
    ].sort((a, b) => a.title.localeCompare(b.title, 'vi'));

    return (
        <div className="bg-primary animate-fade-in">
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-text-primary">Trung tâm Điều hành Vận hành Thông minh</h1>
                        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">Tối ưu hóa mọi mắt xích trong chuỗi giá trị của bạn, từ nhà cung cấp đến khách hàng cuối cùng, với sự trợ giúp của AI. Các tính năng có ✨ được hỗ trợ bởi Gemini API.</p>
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

export default OperationsPage;
