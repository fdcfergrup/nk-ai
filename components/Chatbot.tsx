import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

type Message = {
    role: 'user' | 'model';
    text: string;
};

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1 p-3">
        <span className="text-sm text-text-secondary">Trợ lý đang nhập</span>
        <div className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce"></div>
    </div>
);


const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'model',
            text: 'Xin chào! Tôi là Trợ lý AI của NK. Tôi có thể giúp gì cho bạn về các tính năng, bảng giá hoặc chính sách của chúng tôi?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !chatRef.current && API_KEY) {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash-preview-04-17',
                config: {
                    systemInstruction: "You are a friendly and helpful support assistant for NK AI, a SaaS platform. Your name is 'Trợ lý NK'. Your goal is to answer user questions about the platform's features, pricing, and policies. Keep your answers concise, clear, and helpful. If you don't know the answer, politely say that you don't have the information and suggest contacting support via the hotline (0817 477 788) or email (admin@nkaitechnology.onmicrosoft.com). Always respond in Vietnamese.",
                }
            });
            chatRef.current = chat;
        }
    }, [isOpen]);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { role: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: userMessage.text });
            const botMessage: Message = { role: 'model', text: response.text };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage: Message = { role: 'model', text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [inputValue, isLoading]);

    if (!API_KEY) {
        return null; // Don't render chatbot if no API key
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-accent rounded-full p-4 text-primary shadow-lg hover:bg-accent-dark transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-accent animate-glow z-[100]"
                aria-label="Mở Trợ lý Hỗ trợ AI"
            >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 5.589 2 10C2 12.287 3.237 14.331 5.071 15.931C5.024 16.484 4.5 20 2 22C4.944 21.406 6.188 19.531 6.625 18.813C8.019 19.563 9.656 20 11.406 20C12.378 20 13.313 19.891 14.188 19.688C15.938 21.375 18.219 22 21 22C21.563 22 22 21.563 22 21V20.375C22.75 19.625 23 18.594 23 17.5C23 13.344 18.656 10 14.5 10C14.188 10 13.875 10.031 13.594 10.063C13.219 5.969 9.625 3 6 3C4.906 3 3.875 3.188 3 3.594C3.031 3.375 3 3.188 3 3C3 2.438 3.438 2 4 2H12M6 5C8.761 5 11 7.239 11 10C11 10.275 10.974 10.547 10.929 10.813C12.016 11.453 13.156 12 14.5 12C17.538 12 20 14.239 20 16.5C20 17.656 19.438 18.688 18.563 19.313C18.188 18.594 17.5 18 16.719 17.5C16.125 17.906 15.344 18.125 14.5 18.125C13.563 18.125 12.688 17.875 11.938 17.438C10.781 16.656 10 15.344 10 13.875C9.094 14.563 7.625 15 6 15C5.031 15 4.125 14.813 3.313 14.5C4.25 12.656 4.625 10.75 5.063 9.063C5.344 6.844 5.563 5 6 5Z"/></svg>
            </button>
            
            {isOpen && (
                 <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[600px] flex flex-col bg-secondary shadow-2xl shadow-black/50 rounded-xl border border-white/10 z-[100] animate-slide-in-up">
                    <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-white/10">
                        <h3 className="font-bold font-heading text-lg text-text-primary">Trợ lý Hỗ trợ NK AI</h3>
                        <button onClick={() => setIsOpen(false)} className="text-text-secondary hover:text-text-primary text-3xl leading-none">&times;</button>
                    </header>

                    <div className="flex-grow p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">AI</div>}
                                    <div className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-sm ${msg.role === 'user' ? 'bg-accent text-primary rounded-br-none' : 'bg-primary text-text-primary rounded-bl-none'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-end gap-2 justify-start">
                                     <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">AI</div>
                                    <div className="px-4 py-2 rounded-2xl bg-primary text-text-primary rounded-bl-none">
                                        <TypingIndicator />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <footer className="flex-shrink-0 p-4 border-t border-white/10">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                             <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Nhập câu hỏi của bạn..."
                                disabled={isLoading}
                                className="bg-primary border border-white/10 rounded-lg p-3 w-full text-text-primary focus:ring-accent focus:border-accent outline-none disabled:bg-primary/50"
                                autoComplete="off"
                            />
                            <button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-accent text-primary rounded-lg p-3 hover:bg-accent-dark transition-colors disabled:bg-secondary disabled:cursor-not-allowed">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>
                            </button>
                        </form>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Chatbot;
