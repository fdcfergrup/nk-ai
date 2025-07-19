import React, { useState, useContext } from 'react';
import { AuthContext, hasAccess } from '../contexts/AuthContext';
import { Page, UserPlan } from '../types';

const planNames: Record<UserPlan, string> = {
    'free': 'Miễn phí',
    'personal': 'Cá nhân',
    'premium': 'Premium',
    'team': 'Đội nhóm',
    'enterprise': 'Doanh nghiệp',
};

const ProfileContent: React.FC = () => {
    const auth = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu mới không khớp.' });
            return;
        }
        if (newPassword.length < 3) { // Simplified for demo
            setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 3 ký tự.' });
            return;
        }

        setLoading(true);
        setTimeout(() => { // Simulate API call
            const result = auth.changePassword(auth.user!.email, oldPassword, newPassword);
            if (result === 'success') {
                setMessage({ type: 'success', text: 'Đổi mật khẩu thành công! Mật khẩu mới sẽ có hiệu lực từ lần đăng nhập tiếp theo.' });
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else if (result === 'wrong_pass') {
                setMessage({ type: 'error', text: 'Mật khẩu cũ không chính xác.' });
            } else {
                setMessage({ type: 'error', text: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="animate-slide-in-up">
            <h2 className="text-2xl font-bold font-heading text-text-primary mb-1">Hồ sơ của bạn</h2>
            <p className="text-text-secondary mb-6">Quản lý thông tin cá nhân và bảo mật tài khoản.</p>
            <div className="space-y-6 max-w-lg">
                <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                     <h3 className="font-semibold text-lg text-text-primary mb-4">Thông tin cơ bản</h3>
                     <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Địa chỉ Email</label>
                            <p className="text-text-primary font-semibold mt-1">{auth.user?.email}</p>
                        </div>
                     </div>
                </div>
                 <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <h3 className="font-semibold text-lg text-text-primary mb-4">Đổi mật khẩu</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Mật khẩu cũ</label>
                            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="mt-1 bg-primary border border-white/10 rounded-md p-2 w-full text-text-primary focus:ring-accent focus:border-accent outline-none" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Mật khẩu mới</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="mt-1 bg-primary border border-white/10 rounded-md p-2 w-full text-text-primary focus:ring-accent focus:border-accent outline-none" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Xác nhận mật khẩu mới</label>
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 bg-primary border border-white/10 rounded-md p-2 w-full text-text-primary focus:ring-accent focus:border-accent outline-none" />
                        </div>
                        {message && <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-500'}`}>{message.text}</p>}
                        <div className="text-right pt-2">
                            <button type="submit" disabled={loading} className="font-semibold bg-accent text-primary py-2 px-5 rounded-md hover:bg-accent-dark transition-colors disabled:bg-secondary disabled:text-text-secondary disabled:cursor-wait">
                                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const PlanContent: React.FC<{onNavigate: (page: Page) => void}> = ({onNavigate}) => {
    const auth = useContext(AuthContext);
    const { user } = auth;
    if (!user) return null;

    const { aiRequests, financialAiRequests } = user.usage;
    const aiPercentage = aiRequests.total === Infinity ? 100 : (aiRequests.used / aiRequests.total) * 100;
    const financialAiPercentage = financialAiRequests ? (financialAiRequests.total === Infinity ? 100 : (financialAiRequests.used / financialAiRequests.total) * 100) : 0;

    const UsageBar: React.FC<{label: string; used: number; total: number; percentage: number}> = ({label, used, total, percentage}) => (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-medium text-text-secondary">{label}</span>
                <span className="text-sm font-mono text-text-primary">
                    {used.toLocaleString('de-DE')} / {total === Infinity ? '∞' : total.toLocaleString('de-DE')}
                </span>
            </div>
            <div className="w-full bg-primary rounded-full h-2.5 border border-white/10">
                <div className="bg-gradient-to-r from-accent-secondary to-accent h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );

    return (
        <div className="animate-slide-in-up">
            <h2 className="text-2xl font-bold font-heading text-text-primary mb-1">Gói dịch vụ</h2>
            <p className="text-text-secondary mb-6">Xem thông tin gói cước và mức sử dụng tài nguyên của bạn.</p>
            <div className="space-y-6 max-w-lg">
                <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center">
                         <div>
                            <h3 className="font-semibold text-lg text-text-secondary">Gói hiện tại</h3>
                            <p className="text-2xl font-bold text-accent">{planNames[user.plan]}</p>
                         </div>
                         <button onClick={() => onNavigate('pricing')} className="font-semibold bg-accent text-primary py-2 px-5 rounded-md hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20">
                            Nâng cấp
                        </button>
                    </div>
                </div>
                 <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                    <h3 className="font-semibold text-lg text-text-primary mb-4">Mức sử dụng tháng này</h3>
                    <div className="space-y-4">
                        <UsageBar label="Yêu cầu AI chung" used={aiRequests.used} total={aiRequests.total} percentage={aiPercentage} />
                        {financialAiRequests && (
                             <UsageBar label="Yêu cầu AI Tài chính" used={financialAiRequests.used} total={financialAiRequests.total} percentage={financialAiPercentage} />
                        )}
                    </div>
                 </div>
            </div>
        </div>
    );
};

const DashboardsContent: React.FC<{onNavigate: (page: Page) => void}> = ({onNavigate}) => {
    const auth = useContext(AuthContext);
    const { user } = auth;
    if (!user) return null;

    interface Dashboard {
        title: string;
        moduleKey: Page;
        requiredPlan: UserPlan;
        description: string;
    }

    const dashboards: Dashboard[] = [
        { title: "Quản lý Bán hàng (Sales)", moduleKey: 'sales-dashboard', requiredPlan: 'team', description: "Dự báo, quản lý pipeline và tối ưu hiệu suất đội ngũ kinh doanh." },
        { title: "Quản lý Nhân sự (HRM)", moduleKey: 'hrm-dashboard', requiredPlan: 'team', description: "Tự động hóa chấm công, tính lương, quản lý vòng đời nhân viên." },
        { title: "Quan hệ Khách hàng (CRM)", moduleKey: 'crm-dashboard', requiredPlan: 'team', description: "Lưu trữ, phân tích và làm giàu dữ liệu để cá nhân hóa trải nghiệm." },
        { title: "Mục tiêu & Kết quả (OKRs/KPIs)", moduleKey: 'okrs-dashboard', requiredPlan: 'team', description: "Soạn thảo, tinh chỉnh và theo dõi các mục tiêu quan trọng." },
    ];

    const DashboardCard: React.FC<{title: string, description: string, page: Page, isLocked: boolean}> = ({title, description, page, isLocked}) => (
        <div className={`relative rounded-xl p-6 text-left flex flex-col transition-all duration-300 border ${isLocked ? 'bg-primary/50 border-white/5' : 'bg-secondary/50 border-white/10 hover:border-accent/70 hover:-translate-y-1'}`}>
            {isLocked && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center z-10"><span className="text-yellow-400 font-bold flex items-center gap-2"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>Yêu cầu gói Đội nhóm</span></div>}
            <h4 className={`font-bold font-heading text-lg ${isLocked ? 'text-text-secondary' : 'text-text-primary'}`}>{title}</h4>
            <p className={`text-sm flex-grow mt-2 ${isLocked ? 'text-gray-600' : 'text-text-secondary'}`}>
                {description}
            </p>
            <button onClick={() => onNavigate(page)} disabled={isLocked} className="mt-4 text-left font-semibold text-sm text-accent hover:text-accent-dark disabled:text-text-secondary/50 disabled:cursor-not-allowed disabled:no-underline">
                Đi đến Bảng điều khiển &rarr;
            </button>
        </div>
    );
    
    return (
        <div className="animate-slide-in-up">
            <h2 className="text-2xl font-bold font-heading text-text-primary mb-1">Bảng điều khiển</h2>
            <p className="text-text-secondary mb-6">Truy cập các trung tâm điều hành chuyên sâu cho doanh nghiệp của bạn.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dashboards.map(d => (
                    <DashboardCard 
                        key={d.moduleKey}
                        title={d.title}
                        description={d.description}
                        page={d.moduleKey}
                        isLocked={!hasAccess(user.plan, d.requiredPlan)}
                    />
                ))}
            </div>
        </div>
    );
};


const AccountPage: React.FC<{onNavigate: (page: Page) => void}> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const auth = useContext(AuthContext);

    if (!auth.user) {
        // This should ideally be handled by the router in App.tsx, but serves as a fallback.
        return (
            <div className="container mx-auto text-center py-20">
                <h1 className="text-2xl font-bold text-text-primary">Vui lòng đăng nhập để truy cập trang này.</h1>
                <button onClick={() => onNavigate('auth')} className="mt-4 bg-accent text-primary font-bold py-3 px-8 rounded-lg hover:bg-accent-dark transition-colors">
                    Đến trang Đăng nhập
                </button>
            </div>
        );
    }
    
    const tabs = [
        { id: 'profile', label: 'Hồ sơ', icon: <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> },
        { id: 'plan', label: 'Gói dịch vụ', icon: <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
        { id: 'dashboards', label: 'Bảng điều khiển', icon: <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> },
    ];

    return (
        <div className="bg-primary min-h-[calc(100vh-150px)] animate-fade-in">
            <div className="container mx-auto px-6 py-12">
                 <div className="md:flex md:space-x-8">
                    <aside className="md:w-64 flex-shrink-0 mb-8 md:mb-0">
                        <nav className="space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${activeTab === tab.id ? 'bg-accent text-primary' : 'text-text-secondary hover:bg-secondary/50 hover:text-text-primary'}`}
                                >
                                   {tab.icon}
                                   {tab.label}
                                </button>
                            ))}
                        </nav>
                    </aside>
                    <main className="flex-grow">
                        {activeTab === 'profile' && <ProfileContent />}
                        {activeTab === 'plan' && <PlanContent onNavigate={onNavigate} />}
                        {activeTab === 'dashboards' && <DashboardsContent onNavigate={onNavigate} />}
                    </main>
                 </div>
            </div>
        </div>
    );
};

export default AccountPage;