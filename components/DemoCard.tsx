
import React, { useState, useCallback } from 'react';
import { callGemini } from '../services/geminiService';
import DemoButton from './ui/DemoButton';
import AiResponse from './ui/AiResponse';

interface DemoCardProps {
    title: string;
    description: string;
    promptTemplate: (input: string, context?: string) => string;
    buttonText: string;
    inputElement: 'input' | 'textarea';
    inputLabel: string;
    inputPlaceholder: string;
    initialInputValue?: string;
    contextLabel?: string;
    contextValue?: string;
    isContextReadonly?: boolean;
}

const DemoCard: React.FC<DemoCardProps> = ({ title, description, promptTemplate, buttonText, inputElement, inputLabel, inputPlaceholder, initialInputValue = '', contextLabel, contextValue, isContextReadonly = true }) => {
    const [inputValue, setInputValue] = useState(initialInputValue);
    const [contextContent, setContextContent] = useState(contextValue || '');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    const handleSubmit = useCallback(async () => {
        if (!inputValue.trim()) {
            setResponse('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        setIsLoading(true);
        setResponse(null);
        setSaveStatus('');
        const prompt = promptTemplate(inputValue, contextContent);
        const result = await callGemini(prompt);
        setResponse(result);
        setIsLoading(false);
    }, [inputValue, contextContent, promptTemplate]);

    const handleSave = (provider: 'google' | 'onedrive') => {
        setSaveStatus(`✅ Mô phỏng: Đã lưu thành công vào ${provider === 'google' ? 'Google Drive' : 'OneDrive'}!`);
        setTimeout(() => setSaveStatus(''), 3000);
    };

    const InputComponent = inputElement === 'textarea' ? 'textarea' : 'input';

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col">
            <h3 className="text-xl font-bold font-heading text-brand-primary mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{description}</p>
            
            {contextLabel && (
                <div className="mb-4">
                    <label className="font-semibold text-gray-700 block mb-2 text-sm">{contextLabel}</label>
                    <textarea 
                        value={contextContent}
                        onChange={(e) => setContextContent(e.target.value)}
                        readOnly={isContextReadonly}
                        rows={6} 
                        className="w-full border border-gray-300 rounded-md p-3 text-xs bg-gray-50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none" 
                    />
                </div>
            )}

            <div>
                <label htmlFor={`input-${title}`} className="font-semibold text-gray-700 block mb-2 text-sm">{inputLabel}</label>
                <InputComponent
                    id={`input-${title}`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={inputPlaceholder}
                    rows={inputElement === 'textarea' ? 6 : undefined}
                    className="w-full border border-gray-300 rounded-md p-3 transition-colors focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none"
                />
            </div>
            <div className="mt-4">
                <DemoButton onClick={handleSubmit} isLoading={isLoading}>
                    ✨ {buttonText}
                </DemoButton>
                {response && (
                    <>
                        <AiResponse content={response} showSaveButtons={!isLoading} onSave={handleSave} />
                        <div className="text-sm text-green-600 mt-2 h-5 transition-opacity duration-500">
                            {saveStatus}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DemoCard;
