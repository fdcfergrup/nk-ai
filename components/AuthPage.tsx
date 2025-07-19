import React, { useState, useContext } from 'react';
import { Page } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import DemoButton from './ui/DemoButton';

interface AuthPageProps {
    onNavigate: (page: Page) => void;
}

const SocialButton: React.FC<{ provider: 'google' | 'facebook', onClick: () => void, children: React.ReactNode }> = ({ provider, onClick, children }) => {
    const baseClasses = "w-full inline-flex justify-center items-center py-2.5 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary transition-colors";
    const providerClasses = {
        google: "bg-primary border-white/20 text-text-primary hover:bg-secondary focus:ring-accent",
        facebook: "bg-[#1877F2] border-transparent text-white hover:bg-[#166fe5] focus:ring-blue-500"
    };

    const icon = provider === 'google' ? (
        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.082,5.571l6.19,5.238C42.012,35.426,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
    ) : (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-1.5 c-0.83,0-1,0.47-1,1V12h2.5l-0.5,3H13v6.95C18.05,21.45,22,17.19,22,12z"></path>
        </svg>
    );

    return (
        <button onClick={onClick} className={`${baseClasses} ${providerClasses[provider]}`}>
            {icon}
            {children}
        </button>
    );
};

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => { // Simulate network delay
            let success = false;
            if (isLogin) {
                success = auth.login(email, password);
                if (!success) setError('Email hoặc mật khẩu không chính xác.');
            } else {
                success = auth.register(email, password);
                if (!success) setError('Email này đã được sử dụng.');
            }

            if (success) {
                onNavigate('governance');
            }
            setLoading(false);
        }, 500);
    };
    
    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        setLoading(true);
        setError('');
        setTimeout(() => {
            const success = auth.socialLogin(provider);
            if(success) {
                onNavigate('governance');
            } else {
                 setError(`Không thể đăng nhập với ${provider}. Vui lòng thử lại.`);
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-primary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-secondary/50 backdrop-blur-lg p-10 rounded-xl shadow-2xl shadow-black/30 border border-white/10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-text-primary font-heading">
                        {isLogin ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}
                    </h2>
                </div>
                <div className="mt-8 space-y-4">
                     <div className="grid grid-cols-1 gap-3">
                        <SocialButton provider="google" onClick={() => handleSocialLogin('google')}>Đăng nhập với Google</SocialButton>
                        <SocialButton provider="facebook" onClick={() => handleSocialLogin('facebook')}>Đăng nhập với Facebook</SocialButton>
                    </div>
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-secondary text-text-secondary">Hoặc tiếp tục với</span>
                        </div>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Địa chỉ email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-white/20 placeholder-text-secondary text-text-primary rounded-t-md focus:outline-none focus:ring-accent focus:border-accent sm:text-sm bg-primary"
                                placeholder="Địa chỉ email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mật khẩu</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-white/20 placeholder-text-secondary text-text-primary rounded-b-md focus:outline-none focus:ring-accent focus:border-accent sm:text-sm bg-primary"
                                placeholder="Mật khẩu"
                            />
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <div>
                        <DemoButton isLoading={loading} type="submit" className="w-full">
                            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                        </DemoButton>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-accent hover:text-accent-dark">
                        {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;