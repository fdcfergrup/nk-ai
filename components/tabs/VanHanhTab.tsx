import React, { useContext } from 'react';
import { ModuleKey } from '../../types';
import DemoCard from '../DemoCard';
import ModuleCard from '../ModuleCard';
import AnomalyChart from '../AnomalyChart';
import { AuthContext, hasAccess } from '../../contexts/AuthContext';
import { ALL_MODULES } from '../../data/modules';

interface QuanTriVanHanhTabProps {
    onModuleClick: (moduleKey: ModuleKey) => void;
}

const QuanTriVanHanhTab: React.FC<QuanTriVanHanhTabProps> = ({ onModuleClick }) => {
    const auth = useContext(AuthContext);
    const userPlan = auth.user?.plan || 'free';
    const getModuleInfo = (key: ModuleKey) => ALL_MODULES.find(m => m.moduleKey === key);

    const modules = [
        { moduleKey: "supply-chain", title: "Chuỗi cung ứng", description: "Phân tích rủi ro và tối ưu hóa chuỗi cung ứng.", isAiPowered: true },
        { moduleKey: "inventory-forecasting", title: "Dự báo Tồn kho", description: "Cung cấp dữ liệu bán hàng lịch sử, AI sẽ dự báo nhu cầu tồn kho cho giai đoạn tiếp theo.", isAiPowered: true },
        { moduleKey: "supplier-evaluation", title: "Đánh giá Nhà cung cấp", description: "Tạo một khung tiêu chí chi tiết để đánh giá và lựa chọn các nhà cung cấp tiềm năng.", isAiPowered: true },
        { moduleKey: "cost-reduction-ideas", title: "Gợi ý Cắt giảm Chi phí", description: "Mô tả lĩnh vực hoạt động, AI sẽ đưa ra các ý tưởng sáng tạo để cắt giảm chi phí vận hành.", isAiPowered: true },
        { moduleKey: "logistics-planner", title: "Hoạch định Logistics", description: "Nhập danh sách điểm giao hàng, AI sẽ đề xuất tuyến đường vận chuyển tối ưu.", isAiPowered: true },
        { moduleKey: "incident-report-analyzer", title: "Phân tích Báo cáo Sự cố", description: "Dán nhiều báo cáo sự cố, AI sẽ phân tích để tìm ra các xu hướng và nguyên nhân gốc rễ.", isAiPowered: true },
        { moduleKey: "maintenance", title: "Quản lý Bảo trì", description: "Tạo phiếu yêu cầu công việc và gợi ý lịch bảo trì.", isAiPowered: true },
        { moduleKey: "quality", title: "Quản lý Chất lượng", description: "Đề xuất phương pháp phân tích nguyên nhân gốc rễ cho các vấn đề chất lượng.", isAiPowered: true },
        { moduleKey: "risk", title: "Quản lý Rủi ro", description: "Nhận diện và đề xuất phương án giảm thiểu rủi ro vận hành.", isAiPowered: true },
        { moduleKey: "asset", title: "Quản lý Tài sản", description: "Đề xuất lịch bảo trì, theo dõi và tối ưu hóa vòng đời tài sản.", isAiPowered: true },
        { moduleKey: "safety-protocol-writer", title: "Soạn thảo Quy trình An toàn", description: "Mô tả một công việc hoặc khu vực, AI sẽ giúp soạn thảo một bộ quy trình an toàn lao động chi tiết.", isAiPowered: true },
        { moduleKey: "kpi-dashboard-designer", title: "Thiết kế Dashboard KPI", description: "Cho biết bộ phận hoặc mục tiêu, AI sẽ đề xuất các KPI quan trọng nhất cần theo dõi.", isAiPowered: true },
        { moduleKey: "facility-layout-optimizer", title: "Tối ưu Bố trí Mặt bằng", description: "Mô tả bố trí nhà xưởng/kho hiện tại, AI sẽ gợi ý các thay đổi để tăng hiệu quả.", isAiPowered: true },
        { moduleKey: "process-optimization", title: "Tối ưu hóa Quy trình", description: "Mô tả một quy trình làm việc, AI sẽ phân tích và chỉ ra các điểm nghẽn, đề xuất cải tiến.", isAiPowered: true },
        { moduleKey: "workflow-automation", title: "Tự động hóa Luồng công việc", description: "Mô tả một luồng công việc lặp lại, AI sẽ xác định các bước có thể được tự động hóa.", isAiPowered: true },
    ].sort((a, b) => a.title.localeCompare(b.title, 'vi'));

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-primary">Trung tâm Điều hành Vận hành Thông minh</h2>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Tối ưu hóa mọi mắt xích trong chuỗi giá trị của bạn, từ nhà cung cấp đến khách hàng cuối cùng, với sự trợ giúp của AI.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <DemoCard
                    title="Trợ lý Tối ưu Tồn kho"
                    description="Nhập thông tin sản phẩm, AI sẽ gợi ý điểm đặt hàng lại tối ưu."
                    inputElement="textarea"
                    inputLabel="Thông tin sản phẩm:"
                    inputPlaceholder="Ví dụ: Sản phẩm: Áo thun cotton, Tồn kho: 200 cái, Bán trung bình: 15 cái/ngày, Thời gian chờ hàng: 7 ngày."
                    buttonText="Tính toán"
                    promptTemplate={(input) => `Với vai trò là chuyên gia quản lý kho, hãy phân tích thông tin sau: "${input}". Tính toán và đề xuất mức tồn kho an toàn (safety stock) và điểm đặt hàng lại (reorder point). Trình bày rõ ràng công thức và kết quả. Giả sử mức độ dịch vụ mong muốn là 95% (Z=1.65) nếu cần.`}
                />
                <AnomalyChart />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default QuanTriVanHanhTab;