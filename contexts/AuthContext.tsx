import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserPlan } from '../types';

// Mock user database
const MOCK_USERS: Record<string, { password_hash: string, plan: UserPlan, usage: User['usage'] }> = {
    "demo@nk.ai": { password_hash: "demo", plan: "enterprise", usage: { aiRequests: { used: 999, total: Infinity }, financialAiRequests: { used: 999, total: Infinity } } },
    "personal@test.com": { password_hash: "123", plan: "personal", usage: { aiRequests: { used: 50, total: 250 } } },
    "premium@test.com": { password_hash: "123", plan: "premium", usage: { aiRequests: { used: 120, total: 500 }, financialAiRequests: { used: 25, total: 100 } } },
    "team@test.com": { password_hash: "123", plan: "team", usage: { aiRequests: { used: 800, total: 2000 }, financialAiRequests: { used: 450, total: 1000 } } },
    "enterprise@test.com": { password_hash: "123", plan: "enterprise", usage: { aiRequests: { used: 5230, total: Infinity }, financialAiRequests: { used: 2100, total: Infinity } } },
    "user@google.com": { password_hash: "social_login", plan: "premium", usage: { aiRequests: { used: 250, total: 500 }, financialAiRequests: { used: 80, total: 100 } } },
    "user@facebook.com": { password_hash: "social_login", plan: "personal", usage: { aiRequests: { used: 10, total: 250 } } },
    "fullactive1@nk.ai": { password_hash: "full1", plan: "enterprise", usage: { aiRequests: { used: 999, total: Infinity }, financialAiRequests: { used: 999, total: Infinity } } },
    "fullactive2@nk.ai": { password_hash: "full2", plan: "enterprise", usage: { aiRequests: { used: 999, total: Infinity }, financialAiRequests: { used: 999, total: Infinity } } },
    "fullactive3@nk.ai": { password_hash: "full3", plan: "enterprise", usage: { aiRequests: { used: 990, total: Infinity }, financialAiRequests: { used: 999, total: Infinity } } },
    "fullactive4@nk.ai": { password_hash: "full4", plan: "enterprise", usage: { aiRequests: { used: 999, total: Infinity }, financialAiRequests: { used: 999, total: Infinity } } },
    "fullactive5@nk.ai": { password_hash: "full5", plan: "enterprise", usage: { aiRequests: { used: 999, total: Infinity }, financialAiRequests: { used: 999, total: Infinity } } },
};

const planHierarchy: Record<UserPlan, number> = {
    'free': 0,
    'personal': 1,
    'premium': 2,
    'team': 3,
    'enterprise': 4,
};

export const hasAccess = (userPlan: UserPlan, requiredPlan: UserPlan): boolean => {
    if (!userPlan || !requiredPlan) return false;
    return planHierarchy[userPlan] >= planHierarchy[requiredPlan];
};


interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => boolean;
    socialLogin: (provider: 'google' | 'facebook') => boolean;
    logout: () => void;
    register: (email: string, pass: string) => boolean;
    changePassword: (email: string, oldPass: string, newPass: string) => 'success' | 'not_found' | 'wrong_pass';
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => false,
    socialLogin: () => false,
    logout: () => {},
    register: () => false,
    changePassword: () => 'not_found',
    loading: true,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('nk-user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('nk-user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (email: string, pass: string): boolean => {
        const mockUser = MOCK_USERS[email.toLowerCase()];
        if (mockUser && mockUser.password_hash === pass) {
            const loggedInUser: User = { 
                email: email.toLowerCase(), 
                plan: mockUser.plan,
                usage: mockUser.usage
            };
            localStorage.setItem('nk-user', JSON.stringify(loggedInUser));
            setUser(loggedInUser);
            return true;
        }
        return false;
    };
    
    const socialLogin = (provider: 'google' | 'facebook'): boolean => {
        const email = provider === 'google' ? 'user@google.com' : 'user@facebook.com';
        const mockUser = MOCK_USERS[email];
        if (mockUser) {
             const loggedInUser: User = { email, plan: mockUser.plan, usage: mockUser.usage };
            localStorage.setItem('nk-user', JSON.stringify(loggedInUser));
            setUser(loggedInUser);
            return true;
        }
        return false;
    };

    const register = (email: string, pass: string): boolean => {
        if (MOCK_USERS[email.toLowerCase()]) {
            // User already exists
            return false;
        }
        // For demo, new registrations get a 'personal' plan
        const newUser: User = { email: email.toLowerCase(), plan: 'personal', usage: { aiRequests: { used: 0, total: 250 } } };
        MOCK_USERS[email.toLowerCase()] = { password_hash: pass, plan: 'personal', usage: newUser.usage };
        localStorage.setItem('nk-user', JSON.stringify(newUser));
        setUser(newUser);
        return true;
    };

    const changePassword = (email: string, oldPass: string, newPass: string): 'success' | 'not_found' | 'wrong_pass' => {
        const userToUpdate = MOCK_USERS[email.toLowerCase()];
        if (!userToUpdate) {
            return 'not_found';
        }
        if (userToUpdate.password_hash !== oldPass) {
            return 'wrong_pass';
        }
        // "Update" the password in our mock DB
        userToUpdate.password_hash = newPass;
        // Note: In a real app, you'd also need to update the JWT or session state.
        // Here we just update the mock DB. The user object in state is not affected until re-login.
        return 'success';
    };


    const logout = () => {
        localStorage.removeItem('nk-user');
        setUser(null);
    };

    const value = { user, login, socialLogin, logout, register, changePassword, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};