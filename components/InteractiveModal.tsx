import React, { useState, useEffect, useCallback, useMemo, useRef, useContext } from 'react';
import { ModuleKey, ModuleTemplate, Page, UserPlan } from '../types';
import { callGemini } from '../services/geminiService';
import DemoButton from './ui/DemoButton';
import AiResponse from './ui/AiResponse';
import AnomalyChart from './AnomalyChart';
import { AuthContext, hasAccess } from '../contexts/AuthContext';
import { ALL_MODULES, ModuleInfo } from '../data/modules';

// Forward declaration for QRCode
declare const QRCode: any;

const MOCK_RATES: Record<string, { rate: number, symbol: string, name: string }> = {
    'VND': { rate: 25450, symbol: '₫', name: 'Việt Nam Đồng' },
    'USD': { rate: 1, symbol: '$', name: 'Đô la Mỹ' },
    'EUR': { rate: 0.93, symbol: '€', name: 'Euro' },
    'JPY': { rate: 159.6, symbol: '¥', name: 'Yên Nhật' },
    'GBP': { rate: 0.79, symbol: '£', name: 'Bảng Anh' },
};

const planNames: Record<UserPlan, string> = {
    'free': 'Miễn phí',
    'personal': 'Cá nhân',
    'premium': 'Premium',
    'team': 'Đội nhóm',
    'enterprise': 'Doanh nghiệp',
};

interface InteractiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    moduleKey: ModuleKey | null;
    onNavigate: (page: Page) => void;
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className="bg-primary border border-white/10 rounded-md p-3 transition-colors focus:ring-2 focus:ring-accent focus:border-accent outline-none disabled:bg-primary/50 disabled:cursor-not-allowed text-text-primary w-full" />;
const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} className="bg-primary border border-white/10 rounded-md p-3 transition-colors focus:ring-2 focus:ring-accent focus:border-accent outline-none disabled:bg-primary/50 disabled:cursor-not-allowed text-text-primary w-full" />;
const Label = ({ children, htmlFor }: { children: React.ReactNode, htmlFor?: string }) => <label htmlFor={htmlFor} className="font-semibold text-text-secondary block mb-2 text-sm">{children}</label>;
const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} className="bg-primary border border-white/10 rounded-md p-3 transition-colors focus:ring-2 focus:ring-accent focus:border-accent outline-none text-text-primary w-full appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238A93A3' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }} />;


const InteractiveModal: React.FC<InteractiveModalProps> = ({ isOpen, onClose, moduleKey, onNavigate }) => {
    const [inputValue, setInputValue] = useState('');
    const [contextValue, setContextValue] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');
    const qrCodeRef = useRef<HTMLCanvasElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const auth = useContext(AuthContext);

    // State for specific utilities
    const [password, setPassword] = useState('');
    const [wordCount, setWordCount] = useState({ words: 0, chars: 0 });
    const [palette, setPalette] = useState<string[]>([]);
    const [unitResult, setUnitResult] = useState('');
    const [currencyResult, setCurrencyResult] = useState('');
    const [fakeData, setFakeData] = useState('');
    
    // State for Pomodoro Timer
    const [timer, setTimer] = useState(25 * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerMode, setTimerMode] = useState<'pomodoro' | 'short' | 'long'>('pomodoro');
    const timerIntervalRef = useRef<number | null>(null);

    // State for File Converter
    const [converterState, setConverterState] = useState<'idle' | 'selected' | 'converting' | 'converted'>('idle');
    const [fileName, setFileName] = useState('');
    const [convertFrom, setConvertFrom] = useState('');
    const [convertTo, setConvertTo] = useState('pdf');

    // State for Financial Calculators
    const [calcInputs, setCalcInputs] = useState<Record<string, any>>({});
    const [calcResults, setCalcResults] = useState<Record<string, any>>({});
    
    const handleCalcInputChange = (calculator: string, field: string, value: string | number) => {
        setCalcInputs(prev => ({
            ...prev,
            [calculator]: {
                ...prev[calculator],
                [field]: value
            }
        }));
    };

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
        let newPassword = '';
        for (let i = 0; i < 16; i++) {
            newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(newPassword);
    };

    const generatePalette = () => {
        const newPalette: string[] = [];
        for(let i=0; i<5; i++) {
            const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
            newPalette.push(color);
        }
        setPalette(newPalette);
    };
    
    const generateFakeData = () => {
        const firstNames = ['John', 'Jane', 'Peter', 'Susan', 'Michael', 'Emily'];
        const lastNames = ['Smith', 'Doe', 'Jones', 'Williams', 'Brown', 'Davis'];
        const domains = ['example.com', 'mail.com', 'test.org', 'sample.net'];
        const users = [];
        for (let i = 0; i < 5; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            users.push({
                id: i + 1,
                name: `${firstName} ${lastName}`,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`,
                age: Math.floor(Math.random() * 40) + 20,
            });
        }
        setFakeData(JSON.stringify(users, null, 2));
    };

    const handleFileSelect = () => {
        const files = [
            { name: 'BaoCaoTaiChinh_Q3.docx', from: 'docx', to: ['pdf', 'txt'] },
            { name: 'BangKe_ChiTiet.xlsx', from: 'xlsx', to: ['pdf', 'csv'] },
            { name: 'ThuyetTrinh_DuAn.pptx', from: 'pptx', to: ['pdf'] },
            { name: 'Logo_CongTy.png', from: 'png', to: ['jpg', 'webp'] },
            { name: 'HinhAnh_SuKien.jpg', from: 'jpg', to: ['png', 'webp'] },
        ];
        const selectedFile = files[Math.floor(Math.random() * files.length)];
        setFileName(selectedFile.name);
        setConvertFrom(selectedFile.from);
        setConvertTo(selectedFile.to[0]);
        setConverterState('selected');
    };

    const handleConvert = () => {
        setConverterState('converting');
        setTimeout(() => {
            setConverterState('converted');
        }, 1500);
    };

    const handleResetConverter = () => {
        setConverterState('idle');
        setFileName('');
    };
    
    const resetAllState = useCallback(() => {
        setInputValue('');
        setContextValue('');
        setResponse(null);
        setIsLoading(false);
        setSaveStatus('');
        setPassword('');
        setWordCount({ words: 0, chars: 0 });
        setPalette([]);
        setUnitResult('');
        setCurrencyResult('');
        setFakeData('');
        setConverterState('idle');
        setFileName('');
        setIsTimerRunning(false);
        setTimerMode('pomodoro');
        setTimer(25 * 60);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        setCalcInputs({});
        setCalcResults({});
    }, []);

    const CONVERSION_UNITS: Record<string, {name: string, units: Record<string, string>, factors: Record<string, number>}> = {
        length: { name: 'Độ dài', units: { m: 'Mét (m)', km: 'Kilômét (km)', cm: 'Centimét (cm)', mm: 'Milimét (mm)', mi: 'Dặm (mi)', ft: 'Feet (ft)' }, factors: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, ft: 0.3048 } },
        weight: { name: 'Khối lượng', units: { kg: 'Kilôgam (kg)', g: 'Gam (g)', t: 'Tấn (t)', lb: 'Pound (lb)' }, factors: { kg: 1, g: 0.001, t: 1000, lb: 0.453592 } },
        area: { name: 'Diện tích', units: { sqm: 'Mét vuông (m²)', sqkm: 'Kilômét vuông (km²)', ha: 'Hecta (ha)' }, factors: { sqm: 1, sqkm: 1000000, ha: 10000 } },
    };

    // Effect for Currency Converter
    useEffect(() => {
        if (moduleKey !== 'currency-converter') return;
        const { amount = 1, from = 'USD', to = 'VND' } = calcInputs.currency || {};
        const fromRate = MOCK_RATES[from]?.rate;
        const toRate = MOCK_RATES[to]?.rate;

        if (amount > 0 && fromRate && toRate) {
            const amountInUsd = amount / fromRate;
            const convertedAmount = amountInUsd * toRate;
            const fromSymbol = MOCK_RATES[from]?.symbol;
            const toSymbol = MOCK_RATES[to]?.symbol;
            setCurrencyResult(`${parseFloat(amount).toLocaleString('de-DE')} ${fromSymbol} = ${convertedAmount.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${toSymbol}`);
        } else {
            setCurrencyResult('');
        }
    }, [calcInputs.currency, moduleKey]);

    // Effect for Unit Converter
    useEffect(() => {
        if (moduleKey !== 'unit-converter') return;
        const { type = 'length', value = 1, from = 'm', to = 'cm' } = calcInputs.unit || {};
        
        const fromFactor = CONVERSION_UNITS[type as string]?.factors[from];
        const toFactor = CONVERSION_UNITS[type as string]?.factors[to];

        if (value > 0 && fromFactor && toFactor) {
            const valueInBase = value * fromFactor;
            const result = valueInBase / toFactor;
            setUnitResult(`${value} ${from} = ${result.toLocaleString('de-DE')} ${to}`);
        } else {
            setUnitResult('');
        }
    }, [calcInputs.unit, moduleKey]);

    // Effect for EPS Calculator
    useEffect(() => {
        if(moduleKey !== 'eps-calculator' || !calcInputs.eps) return;
        const { netIncome, prefDividends, avgShares } = calcInputs.eps;
        const ni = parseFloat(netIncome) || 0;
        const pd = parseFloat(prefDividends) || 0;
        const as = parseFloat(avgShares) || 0;

        if (as > 0) {
            const eps = (ni - pd) / as;
            setCalcResults(prev => ({...prev, eps: `EPS = ${eps.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}));
        } else {
            setCalcResults(prev => ({...prev, eps: 'Số lượng cổ phiếu phải lớn hơn 0.'}));
        }
    }, [calcInputs.eps, moduleKey]);

    // Effect for ROI Calculator
    useEffect(() => {
        if(moduleKey !== 'investment-roi' || !calcInputs.roi) return;
        const { netProfit, cost } = calcInputs.roi;
        const np = parseFloat(netProfit) || 0;
        const c = parseFloat(cost) || 0;

        if (c > 0) {
            const roi = (np / c) * 100;
            setCalcResults(prev => ({...prev, roi: `ROI = ${roi.toFixed(2)}%`}));
        } else {
            setCalcResults(prev => ({...prev, roi: 'Chi phí đầu tư phải lớn hơn 0.'}));
        }
    }, [calcInputs.roi, moduleKey]);

    // Effect for NPV Calculator
    useEffect(() => {
        if(moduleKey !== 'npv-irr-calculator' || !calcInputs.npv) return;
        const { initial, cashflows, rate } = calcInputs.npv;
        const initialInvestment = parseFloat(initial) || 0;
        const discountRate = (parseFloat(rate) || 0) / 100;
        const cfArray = cashflows ? cashflows.split(',').map((cf: string) => parseFloat(cf.trim()) || 0) : [];

        if (discountRate > 0) {
            const npv = cfArray.reduce((acc: number, cf: number, index: number) => {
                return acc + (cf / Math.pow(1 + discountRate, index + 1));
            }, 0) - initialInvestment;
            setCalcResults(prev => ({...prev, npv: `NPV = ${npv.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})} VNĐ`}));
        } else {
            setCalcResults(prev => ({...prev, npv: 'Tỷ lệ chiết khấu phải lớn hơn 0.'}));
        }
    }, [calcInputs.npv, moduleKey]);

    // Effect for WACC Calculator
    useEffect(() => {
        if(moduleKey !== 'wacc-calculator' || !calcInputs.wacc) return;
        const { ev, re, dv, rd, tc } = calcInputs.wacc;
        const E_V = (parseFloat(ev) || 0) / 100;
        const Re = (parseFloat(re) || 0) / 100;
        const D_V = (parseFloat(dv) || 0) / 100;
        const Rd = (parseFloat(rd) || 0) / 100;
        const Tc = (parseFloat(tc) || 0) / 100;

        if (E_V > 0 && Re > 0 && D_V > 0 && Rd > 0) {
            const wacc = (E_V * Re) + (D_V * Rd * (1 - Tc));
            setCalcResults(prev => ({...prev, wacc: `WACC = ${(wacc * 100).toFixed(2)}%`}));
        } else {
            setCalcResults(prev => ({...prev, wacc: ''}));
        }
    }, [calcInputs.wacc, moduleKey]);
    
    const moduleInfo = useMemo(() => moduleKey ? ALL_MODULES.find(m => m.moduleKey === moduleKey) : null, [moduleKey]);

    const moduleTemplates: Partial<Record<ModuleKey, ModuleTemplate>> = {
        // New Modules from former DemoCards
        'document-analyzer': {
            title: 'Trợ lý Phân tích Tài liệu',
            isAiPowered: true,
            initialContextValue: "Báo cáo tài chính Quý 4 năm 2024: Doanh thu thuần đạt 15,250 tỷ đồng, tăng 15% YoY. Lợi nhuận sau thuế là 1,850 tỷ đồng, tăng 22% YoY. Biên lợi nhuận gộp cải thiện từ 18.5% lên 20.2%.",
            prompt: (input, context) => `Dựa vào tài liệu sau: "${context}". Hãy trả lời câu hỏi sau một cách súc tích: "${input}"`,
            html: () => (<>
                <p className="text-text-secondary mb-4">Đặt câu hỏi cho tài liệu của bạn và nhận câu trả lời tức thì.</p>
                <div className="mb-4">
                    <Label>Nội dung tài liệu (Mẫu):</Label>
                    <Textarea 
                        value={contextValue}
                        onChange={(e) => setContextValue(e.target.value)}
                        rows={6} 
                    />
                </div>
                <div>
                    <Label>Đặt câu hỏi của bạn:</Label>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={"Ví dụ: Tóm tắt các chỉ số chính."}
                    />
                </div>
            </>),
        },
        'project-planner': {
            title: 'Trợ lý Lập kế hoạch Dự án',
            isAiPowered: true,
            prompt: (input) => `Với vai trò là một quản lý dự án AI, hãy tạo một kế hoạch chi tiết với các giai đoạn (phases) và các nhiệm vụ chính (key tasks) cho mục tiêu sau: "${input}". Trình bày dưới dạng các gạch đầu dòng có cấu trúc.`,
            html: () => (<>
                <p className="text-text-secondary mb-4">Nêu mục tiêu dự án, AI sẽ vạch ra các bước thực hiện chính.</p>
                <Label>Mục tiêu dự án:</Label>
                <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={6}
                    placeholder="Ví dụ: Ra mắt website thương mại điện tử mới cho thương hiệu thời trang trong 3 tháng."
                />
            </>)
        },
        'seo-optimizer': {
            title: 'Trợ lý Tối ưu SEO',
            isAiPowered: true,
            prompt: (input) => `Với vai trò là chuyên gia SEO, cho chủ đề bài viết "${input}", hãy đề xuất: 5 từ khóa chính (primary keywords), 5 từ khóa phụ (secondary keywords), và một thẻ meta description hấp dẫn (khoảng 155 ký tự).`,
            html: () => (<>
                <p className="text-text-secondary mb-4">Nhập chủ đề bài viết để nhận gợi ý từ khóa và mô tả meta hấp dẫn.</p>
                <Label>Chủ đề bài viết:</Label>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ví dụ: Lợi ích của cà phê cho sức khỏe"
                />
            </>)
        },
        'ad-copy-generator': {
            title: 'Trợ lý Tạo Nội dung Quảng cáo',
            isAiPowered: true,
            prompt: (input) => `Hãy viết 2 phương án quảng cáo Facebook (gồm tiêu đề và nội dung) cho sản phẩm và đối tượng được mô tả là "${input}".`,
            html: () => (<>
                <p className="text-text-secondary mb-4">Cung cấp thông tin, AI sẽ tạo các phương án quảng cáo sáng tạo.</p>
                <Label>Tên sản phẩm & Đối tượng:</Label>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ví dụ: Tai nghe X-Sound cho Gen Z"
                />
            </>)
        },
        'inventory-optimizer': {
            title: 'Trợ lý Tối ưu Tồn kho',
            isAiPowered: true,
            prompt: (input) => `Với vai trò là chuyên gia quản lý kho, hãy phân tích thông tin sau: "${input}". Tính toán và đề xuất mức tồn kho an toàn (safety stock) và điểm đặt hàng lại (reorder point). Trình bày rõ ràng công thức và kết quả. Giả sử mức độ dịch vụ mong muốn là 95% (Z=1.65) nếu cần.`,
            html: () => (<>
                <p className="text-text-secondary mb-4">Nhập thông tin sản phẩm, AI sẽ gợi ý điểm đặt hàng lại tối ưu.</p>
                <Label>Thông tin sản phẩm:</Label>
                <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={5}
                    placeholder="Ví dụ: Sản phẩm: Áo thun cotton, Tồn kho: 200 cái, Bán trung bình: 15 cái/ngày, Thời gian chờ hàng: 7 ngày."
                />
            </>)
        },
        'data-anomaly-detector': {
            title: 'Trình Phát Hiện Bất Thường Dữ Liệu',
            isAiPowered: false,
            html: () => <div className="p-0 -m-6"><AnomalyChart /></div>
        },
        // Financial Tools - Non-AI Calculators
        'eps-calculator': {
            title: 'Công cụ Tính EPS',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Tính toán Lợi nhuận trên mỗi cổ phiếu (Earnings Per Share) của công ty.</p>
                <div className="space-y-4">
                    <div><Label>Lợi nhuận ròng (VNĐ):</Label><Input type="number" placeholder="50000000000" onChange={e => handleCalcInputChange('eps', 'netIncome', e.target.value)} /></div>
                    <div><Label>Cổ tức cổ phiếu ưu đãi (VNĐ):</Label><Input type="number" placeholder="0" onChange={e => handleCalcInputChange('eps', 'prefDividends', e.target.value)} /></div>
                    <div><Label>Số lượng cổ phiếu đang lưu hành:</Label><Input type="number" placeholder="2000000000" onChange={e => handleCalcInputChange('eps', 'avgShares', e.target.value)} /></div>
                </div>
                {calcResults.eps && <div className="mt-4 p-4 bg-primary rounded-lg text-accent font-bold text-lg text-center">{calcResults.eps}</div>}
            </>
        },
        'investment-roi': {
            title: 'Công cụ Tính ROI',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Đo lường Tỷ suất Hoàn vốn (Return on Investment) cho các khoản đầu tư.</p>
                <div className="space-y-4">
                    <div><Label>Lợi nhuận ròng từ đầu tư (VNĐ):</Label><Input type="number" placeholder="25000000" onChange={e => handleCalcInputChange('roi', 'netProfit', e.target.value)} /></div>
                    <div><Label>Chi phí đầu tư (VNĐ):</Label><Input type="number" placeholder="100000000" onChange={e => handleCalcInputChange('roi', 'cost', e.target.value)} /></div>
                </div>
                {calcResults.roi && <div className="mt-4 p-4 bg-primary rounded-lg text-accent font-bold text-lg text-center">{calcResults.roi}</div>}
            </>
        },
        'npv-irr-calculator': {
            title: 'Công cụ Tính NPV',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Đánh giá khả năng sinh lời của dự án đầu tư qua Giá trị Hiện tại Ròng (NPV). IRR là một tính toán phức tạp hơn và sẽ được bổ sung sau.</p>
                <div className="space-y-4">
                    <div><Label>Vốn đầu tư ban đầu (VNĐ):</Label><Input type="number" placeholder="1000" onChange={e => handleCalcInputChange('npv', 'initial', e.target.value)} /></div>
                    <div><Label>Dòng tiền qua các năm (ngăn cách bằng dấu phẩy):</Label><Input type="text" placeholder="200, 300, 400, 500" onChange={e => handleCalcInputChange('npv', 'cashflows', e.target.value)} /></div>
                    <div><Label>Tỷ lệ chiết khấu (%):</Label><Input type="number" placeholder="10" onChange={e => handleCalcInputChange('npv', 'rate', e.target.value)} /></div>
                </div>
                {calcResults.npv && <div className="mt-4 p-4 bg-primary rounded-lg text-accent font-bold text-lg text-center">{calcResults.npv}</div>}
            </>
        },
        'wacc-calculator': {
            title: 'Công cụ Tính WACC',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Tính toán Chi phí sử dụng vốn bình quân gia quyền (WACC) của doanh nghiệp.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Tỷ trọng Vốn CSH (%):</Label><Input type="number" placeholder="60" onChange={e => handleCalcInputChange('wacc', 'ev', e.target.value)} /></div>
                    <div><Label>Chi phí Vốn CSH (%):</Label><Input type="number" placeholder="15" onChange={e => handleCalcInputChange('wacc', 're', e.target.value)} /></div>
                    <div><Label>Tỷ trọng Nợ vay (%):</Label><Input type="number" placeholder="40" onChange={e => handleCalcInputChange('wacc', 'dv', e.target.value)} /></div>
                    <div><Label>Chi phí Nợ vay (%):</Label><Input type="number" placeholder="8" onChange={e => handleCalcInputChange('wacc', 'rd', e.target.value)} /></div>
                    <div className="md:col-span-2"><Label>Thuế suất TNDN (%):</Label><Input type="number" placeholder="20" onChange={e => handleCalcInputChange('wacc', 'tc', e.target.value)} /></div>
                </div>
                 {calcResults.wacc && <div className="mt-4 p-4 bg-primary rounded-lg text-accent font-bold text-lg text-center">{calcResults.wacc}</div>}
            </>
        },
        // Utilities
        'password': {
            title: 'Tạo Mật khẩu An toàn',
            isAiPowered: false,
            html: () => (
                <div>
                    <p className="text-text-secondary mb-4">Tạo mật khẩu mạnh và an toàn chỉ với một cú nhấp chuột.</p>
                    <div className="relative">
                        <Input type="text" value={password} readOnly placeholder="Nhấp 'Tạo mới' để bắt đầu" />
                        <button onClick={() => navigator.clipboard.writeText(password)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-white/10 text-text-secondary">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 011-1h3a1 1 0 011 1v1h1a2 2 0 012 2v10a2 2 0 01-2-2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3zm2 2h4v1H9V5zm-2 2v10h10V7H7z"></path></svg>
                        </button>
                    </div>
                    <button onClick={generatePassword} className="mt-4 w-full bg-accent text-primary py-2 px-4 rounded-md font-semibold hover:bg-accent-dark transition-colors">Tạo mới</button>
                </div>
            )
        },
        'qr-generator': {
            title: 'Tạo mã QR',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Tạo mã QR cho URL, văn bản, hoặc thông tin liên hệ.</p>
                <Label htmlFor="qr-input">Nội dung:</Label>
                <Input id="qr-input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="https://nkaitechnology.onmicrosoft.com" />
                <div className="bg-white p-4 rounded-lg mt-4 flex justify-center">
                    <canvas ref={qrCodeRef}></canvas>
                </div>
            </>
        },
        'word-counter': {
            title: 'Đếm Từ & Ký tự',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Dán văn bản của bạn để đếm số từ và ký tự chính xác.</p>
                <Textarea 
                    value={inputValue}
                    onChange={(e) => {
                        const text = e.target.value;
                        setInputValue(text);
                        const words = text.trim().split(/\s+/).filter(Boolean).length;
                        const chars = text.length;
                        setWordCount({ words, chars });
                    }}
                    rows={8}
                    placeholder="Nhập hoặc dán văn bản ở đây..."
                />
                <div className="mt-4 flex justify-around text-center p-4 bg-secondary/50 rounded-lg">
                    <div>
                        <p className="text-2xl font-bold font-mono text-accent">{wordCount.words}</p>
                        <p className="text-sm text-text-secondary">Từ</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold font-mono text-accent">{wordCount.chars}</p>
                        <p className="text-sm text-text-secondary">Ký tự</p>
                    </div>
                </div>
            </>
        },
        'palette': {
            title: 'Tạo Bảng màu',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Tạo các bảng màu hài hòa cho thiết kế của bạn.</p>
                <div className="flex h-24 rounded-lg overflow-hidden">
                    {palette.length > 0 ? palette.map(color => (
                        <div key={color} style={{ backgroundColor: color }} className="w-1/5 flex items-end justify-center p-2 text-xs font-mono text-white/80"
                            onClick={() => navigator.clipboard.writeText(color)}
                        >
                            {color}
                        </div>
                    )) : <div className="w-full flex items-center justify-center bg-primary text-text-secondary">Nhấp 'Tạo mới'</div>}
                </div>
                <button onClick={generatePalette} className="mt-4 w-full bg-accent text-primary py-2 px-4 rounded-md font-semibold hover:bg-accent-dark transition-colors">Tạo mới</button>
            </>
        },
        'currency-converter': {
            title: 'Chuyển đổi Tiền tệ',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Chuyển đổi nhanh giữa các loại tiền tệ phổ biến.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                        <Label>Số tiền</Label>
                        <Input type="number" defaultValue={1} onChange={e => handleCalcInputChange('currency', 'amount', e.target.value)} />
                    </div>
                    <div>
                        <Label>Từ</Label>
                        <Select defaultValue="USD" onChange={e => handleCalcInputChange('currency', 'from', e.target.value)}>
                            {Object.entries(MOCK_RATES).map(([code, { name }]) => <option key={code} value={code}>{name} ({code})</option>)}
                        </Select>
                    </div>
                     <div className="md:col-span-2 text-center text-2xl font-bold text-text-secondary">&darr; &uarr;</div>
                     <div>
                        <Label>Sang</Label>
                        <Select defaultValue="VND" onChange={e => handleCalcInputChange('currency', 'to', e.target.value)}>
                            {Object.entries(MOCK_RATES).map(([code, { name }]) => <option key={code} value={code}>{name} ({code})</option>)}
                        </Select>
                    </div>
                </div>
                {currencyResult && <div className="mt-4 p-4 bg-primary rounded-lg text-accent font-bold text-lg text-center">{currencyResult}</div>}
            </>
        },
        'unit-converter': {
            title: 'Chuyển đổi Đơn vị',
            isAiPowered: false,
            html: () => {
                const selectedType = calcInputs.unit?.type || 'length';
                const unitsForType = CONVERSION_UNITS[selectedType]?.units || {};
                return <>
                    <p className="text-text-secondary mb-4">Chuyển đổi giữa các đơn vị đo lường khác nhau.</p>
                    <div className="space-y-4">
                        <div>
                            <Label>Loại đơn vị</Label>
                             <Select defaultValue="length" onChange={e => handleCalcInputChange('unit', 'type', e.target.value)}>
                                {Object.entries(CONVERSION_UNITS).map(([key, { name }]) => <option key={key} value={key}>{name}</option>)}
                            </Select>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            <div>
                                <Label>Giá trị</Label>
                                <Input type="number" defaultValue={1} onChange={e => handleCalcInputChange('unit', 'value', e.target.value)} />
                            </div>
                            <div>
                                <Label>Từ đơn vị</Label>
                                <Select onChange={e => handleCalcInputChange('unit', 'from', e.target.value)} defaultValue={Object.keys(unitsForType)[0]}>
                                    {Object.entries(unitsForType).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
                                </Select>
                            </div>
                            <div className="md:col-span-2 text-center text-2xl font-bold text-text-secondary">&darr; &uarr;</div>
                            <div>
                                <Label>Sang đơn vị</Label>
                                <Select onChange={e => handleCalcInputChange('unit', 'to', e.target.value)} defaultValue={Object.keys(unitsForType)[1]}>
                                    {Object.entries(unitsForType).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
                                </Select>
                            </div>
                        </div>
                    </div>
                    {unitResult && <div className="mt-4 p-4 bg-primary rounded-lg text-accent font-bold text-lg text-center">{unitResult}</div>}
                </>
            }
        },
        'pomodoro-timer': {
            title: 'Đồng hồ Pomodoro',
            isAiPowered: false,
            html: () => {
                 const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
                 const seconds = (timer % 60).toString().padStart(2, '0');
                 return <>
                    <p className="text-text-secondary mb-4">Quản lý thời gian làm việc tập trung theo phương pháp Pomodoro.</p>
                    <div className="text-center font-mono text-7xl font-bold text-accent bg-primary py-6 rounded-lg my-4">
                        {minutes}:{seconds}
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                         {([['pomodoro', 'Pomodoro (25p)'], ['short', 'Nghỉ ngắn (5p)'], ['long', 'Nghỉ dài (15p)']] as const).map(([mode, label]) => (
                             <button key={mode} onClick={() => setTimerMode(mode)} className={`px-3 py-1 text-sm rounded-full transition-colors ${timerMode === mode ? 'bg-accent text-primary' : 'bg-secondary/50 text-text-secondary'}`}>
                                 {label}
                             </button>
                         ))}
                    </div>
                     <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="w-full bg-accent text-primary py-3 px-4 rounded-md font-semibold hover:bg-accent-dark transition-colors">
                        {isTimerRunning ? 'Tạm dừng' : 'Bắt đầu'}
                    </button>
                 </>
            }
        },
        'fake-data-generator': {
            title: 'Tạo Dữ liệu Mẫu (JSON)',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Tạo nhanh dữ liệu mẫu (JSON) cho mục đích thử nghiệm.</p>
                <Textarea value={fakeData} readOnly rows={8} placeholder="Nhấp 'Tạo mới' để xem dữ liệu mẫu..." />
                <button onClick={generateFakeData} className="mt-4 w-full bg-accent text-primary py-2 px-4 rounded-md font-semibold hover:bg-accent-dark transition-colors">Tạo mới</button>
            </>
        },
        'convert': {
            title: 'Chuyển đổi File (Mô phỏng)',
            isAiPowered: false,
            html: () => <>
                <p className="text-text-secondary mb-4">Nhanh chóng chuyển đổi giữa các định dạng file phổ biến.</p>
                <div className="text-center p-8 border-2 border-dashed border-white/20 rounded-lg bg-primary">
                    {converterState === 'idle' && (
                        <button onClick={handleFileSelect} className="bg-accent text-primary font-semibold py-2 px-5 rounded-md hover:bg-accent-dark transition-colors">
                            Chọn File (Mô phỏng)
                        </button>
                    )}
                    {converterState === 'selected' && (
                        <div>
                            <p className="text-text-primary mb-4">File: <span className="font-semibold">{fileName}</span></p>
                            <div className="flex items-center justify-center gap-4">
                                <span className="font-bold text-lg text-accent-secondary">{convertFrom.toUpperCase()}</span>
                                <span className="text-text-secondary">&rarr;</span>
                                <Select value={convertTo} onChange={e => setConvertTo(e.target.value)}>
                                    <option value="pdf">PDF</option>
                                    <option value="docx">DOCX</option>
                                    <option value="png">PNG</option>
                                </Select>
                            </div>
                            <button onClick={handleConvert} className="mt-6 w-full bg-accent text-primary py-2 px-4 rounded-md font-semibold hover:bg-accent-dark transition-colors">Chuyển đổi</button>
                        </div>
                    )}
                    {converterState === 'converting' && <p className="text-accent animate-pulse">Đang chuyển đổi...</p>}
                    {converterState === 'converted' && (
                         <div>
                             <p className="text-green-400 font-semibold mb-4">Chuyển đổi thành công!</p>
                             <p className="text-text-primary mb-4">File mới: <span className="font-semibold">{fileName.split('.')[0]}.{convertTo}</span></p>
                             <button onClick={handleResetConverter} className="mt-4 text-sm text-accent hover:underline">Chuyển đổi file khác</button>
                         </div>
                    )}
                </div>
            </>
        },
    };
    
    let activeTemplate: ModuleTemplate | null = null;
    if (moduleKey && moduleInfo) {
        const customTemplate = moduleTemplates[moduleKey];
        if (customTemplate) {
            activeTemplate = customTemplate;
        } else if (moduleInfo.isAiPowered) {
            activeTemplate = {
                title: moduleInfo.title,
                isAiPowered: true,
                prompt: (input: string) => `Hãy đóng vai trò là một chuyên gia về "${moduleInfo.title}". Dựa trên vai trò đó, hãy xử lý yêu cầu sau đây một cách chi tiết và chuyên nghiệp:\n\n"${input}"`,
                html: () => (
                    <>
                        <p className="text-text-secondary mb-4">{moduleInfo.description}</p>
                        <Label htmlFor="generic-input">Nhập yêu cầu chi tiết của bạn:</Label>
                        <Textarea
                            id="generic-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            rows={8}
                            placeholder={`Ví dụ: Hãy phân tích, soạn thảo, hoặc đưa ra ý tưởng về "${moduleInfo.title}"...`}
                        />
                    </>
                ),
            };
        } else {
            // Fallback for non-AI modules without a template
            activeTemplate = {
                title: moduleInfo.title,
                isAiPowered: false,
                html: () => (
                    <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                         <div className="text-accent-secondary bg-accent-secondary/10 rounded-full p-3 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="font-bold font-heading text-xl text-text-primary">Tính năng Đang được Phát triển</h3>
                        <p className="text-text-secondary mt-2 max-w-sm">
                            Chức năng <strong className="text-text-primary">"{moduleInfo.title}"</strong> hiện đang được hoàn thiện và sẽ sớm ra mắt. Cảm ơn bạn đã kiên nhẫn.
                        </p>
                    </div>
                )
            };
        }
    }


    useEffect(() => {
        if (isOpen) {
            resetAllState();
            const template = moduleKey ? moduleTemplates[moduleKey] : null;
            if (template?.initialContextValue) {
                setContextValue(template.initialContextValue);
            }
            if (moduleKey === 'currency-converter') {
                handleCalcInputChange('currency', 'amount', 1);
                handleCalcInputChange('currency', 'from', 'USD');
                handleCalcInputChange('currency', 'to', 'VND');
            }
            if (moduleKey === 'unit-converter') {
                handleCalcInputChange('unit', 'type', 'length');
                handleCalcInputChange('unit', 'value', 1);
                handleCalcInputChange('unit', 'from', 'm');
                handleCalcInputChange('unit', 'to', 'cm');
            }
        }
    }, [isOpen, moduleKey]);

    // Effect for QR Code Generation
    useEffect(() => {
        if (moduleKey === 'qr-generator' && qrCodeRef.current && isOpen) {
            QRCode.toCanvas(qrCodeRef.current, inputValue || ' ', { width: 180, margin: 1, color: { dark: '#05070D', light: '#FFFFFF' } }, (error: any) => {
                if (error) console.error(error);
            });
        }
    }, [inputValue, moduleKey, isOpen]);

    // Effect for Pomodoro Timer
    useEffect(() => {
        if (isTimerRunning && timer > 0) {
            timerIntervalRef.current = window.setInterval(() => {
                setTimer((t) => t - 1);
            }, 1000);
        } else if (timer <= 0 && isTimerRunning) {
            setIsTimerRunning(false);
            alert("Hết giờ!");
            // Optionally, play a sound
        }
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [isTimerRunning, timer]);
    
    useEffect(() => {
        if (moduleKey !== 'pomodoro-timer') return;
        let newTime;
        switch (timerMode) {
            case 'short': newTime = 5 * 60; break;
            case 'long': newTime = 15 * 60; break;
            default: newTime = 25 * 60;
        }
        setTimer(newTime);
        setIsTimerRunning(false);
    }, [timerMode, moduleKey]);


    const handleSave = (provider: 'google' | 'onedrive') => {
        setSaveStatus(`✅ Mô phỏng: Đã lưu thành công vào ${provider === 'google' ? 'Google Drive' : 'OneDrive'}!`);
        setTimeout(() => setSaveStatus(''), 3000);
    };

    const handleSubmit = async () => {
        if (!activeTemplate?.prompt) return;

        if (!inputValue.trim() && !contextValue.trim()) {
            setResponse('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        setIsLoading(true);
        setResponse(null);
        setSaveStatus('');
        const prompt = activeTemplate.prompt(inputValue, contextValue);
        const result = await callGemini(prompt);
        setResponse(result);
        setIsLoading(false);
        setTimeout(() => {
            mainContentRef.current?.scrollTo({ top: mainContentRef.current.scrollHeight, behavior: 'smooth' });
        }, 100);
    };

    if (!isOpen || !moduleKey || !moduleInfo) {
        return null;
    }
    
    const userPlan = auth.user?.plan || 'free';
    const requiredPlan = moduleInfo?.requiredPlan || 'free';
    const isAllowed = hasAccess(userPlan, requiredPlan);

    const renderContent = () => {
        if (!activeTemplate) return null;

        if (!isAllowed) {
            return (
                 <div className="p-8 text-center flex flex-col items-center">
                    <div className="text-yellow-400 bg-yellow-400/10 rounded-full p-3 mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd"></path></svg>
                    </div>
                    <h3 className="font-bold font-heading text-xl text-text-primary">Yêu cầu Nâng cấp Gói</h3>
                    <p className="text-text-secondary mt-2 max-w-sm">
                        Tính năng <strong className="text-text-primary">"{moduleInfo?.title}"</strong> yêu cầu gói <strong className="text-accent">{planNames[requiredPlan]}</strong> hoặc cao hơn.
                    </p>
                    <p className="text-text-secondary mt-1">
                        Gói hiện tại của bạn là <strong className="text-accent">{planNames[userPlan]}</strong>.
                    </p>
                    <button onClick={() => { onClose(); onNavigate('pricing'); }} className="mt-6 bg-accent text-primary font-bold py-3 px-8 rounded-lg hover:bg-accent-dark transition-all transform hover:scale-105 shadow-lg shadow-accent/20">
                        Xem các Gói Dịch vụ
                    </button>
                </div>
            );
        }

        return (
            <>
                <main ref={mainContentRef} className="flex-grow p-6 overflow-y-auto">
                    {activeTemplate.html()}
                    {response && <AiResponse content={response} showSaveButtons={!isLoading} onSave={handleSave} />}
                    <div className="text-sm text-green-400 mt-2 h-5 transition-opacity duration-500">
                        {saveStatus}
                    </div>
                </main>
                {(activeTemplate.isAiPowered) && (
                    <footer className="flex-shrink-0 p-6 border-t border-white/10">
                        <DemoButton onClick={handleSubmit} isLoading={isLoading}>
                            ✨ Gửi yêu cầu đến AI
                        </DemoButton>
                    </footer>
                )}
            </>
        )
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-secondary shadow-2xl shadow-black/50 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-white/10 animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex-shrink-0 flex items-start justify-between p-6 border-b border-white/10">
                    <div>
                        <h3 className="font-bold font-heading text-xl text-text-primary">{activeTemplate?.title || moduleInfo?.title}</h3>
                    </div>
                    <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-3xl leading-none">&times;</button>
                </header>
                {renderContent()}
            </div>
        </div>
    );
};

export default InteractiveModal;