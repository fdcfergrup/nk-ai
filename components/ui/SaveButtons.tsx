
import React from 'react';

interface SaveButtonsProps {
    onSave: (provider: 'google' | 'onedrive') => void;
}

const SaveButton: React.FC<{ provider: 'google' | 'onedrive'; onClick: () => void; children: React.ReactNode; }> = ({ provider, onClick, children }) => {
    const icon = provider === 'google' ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M21.53,8.38H21.53l-0.1-0.03V8.35h0l-0.09-.03v0h-0.03l-0.1-.02h0l-0.1-.03h-0.03l-0.1-.02h-0.02l-0.1-.02h-0.02l-0.11-.02h-0.03l-0.11-.02h-0.04l-0.1-.02h-0.04l-0.1-.01h-0.04l-0.11-.01h-0.05l-0.1-.01h-0.05l-0.1-.01h-0.05l-0.11-.01h-0.1L20,8.08h-0.06l-0.1-.01h-0.06L19.72,8h-0.07l-0.1,0h-0.07l-0.1,0h-0.07l-0.1,0h-0.07l-0.1,0h-0.07l-0.1,0h-0.08l-0.1,0h-0.07l-0.1,0h-0.08l-0.1,0h-0.08l-0.1,0H18.2L12,18.48,5.81,8H18.2M22.91,8,12,24,1.09,8a0.5,0.5,0,0,1,0.41-0.76H22.5A0.5,0.5,0,0,1,22.91,8Z" transform="translate(0 -6)"/><path d="M8.53,0,1,13.29a0.5,0.5,0,0,1-.41.76h15a0.5,0.5,0,0,1,0.41-0.76L9.47,0A0.5,0.5,0,0,0,8.53,0Z"/></svg>
    ) : (
        <svg viewBox="0 0 134.1 88.6" className="w-4 h-4"><path fill="#0072C6" d="M28 27.6C15.9 33.1 6.7 43.4 3.2 55.4c-3.4 12 1.3 27.3 12.5 32.2 7.5 3.2 14.8 3.5 21.6 2.1 11.8-2.4 20.3-10.4 28.5-17.7 8.3-7.4 16.3-15.1 27.3-14.2 13.1 1.1 20.6 11.2 28.2 18.5 7.6 7.3 17.6 10.4 26.6 4.9 9.1-5.5 10.9-18.7 5.2-28.5 -5.7-9.8-17.7-13-28.2-7.2 -6.7 3.7-12.2 9.4-18.2 14.9 -10.3 9.4-21.3 18.2-35.8 15.5 -10.9-2-18-10.8-23.7-19.4C30.2 36.1 29.5 31.3 28 27.6z"/></svg>
    );

    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 text-xs py-2 px-3 rounded-md border border-white/10 bg-secondary/50 text-text-secondary hover:bg-white/10 hover:text-text-primary transition-colors"
        >
            {icon}
            <span>{children}</span>
        </button>
    );
}

const SaveButtons: React.FC<SaveButtonsProps> = ({ onSave }) => {
    return (
        <div className="flex space-x-2 mt-4">
            <SaveButton provider="google" onClick={() => onSave('google')}>
                Lưu vào Google Drive
            </SaveButton>
            <SaveButton provider="onedrive" onClick={() => onSave('onedrive')}>
                Lưu vào OneDrive
            </SaveButton>
        </div>
    );
};

export default SaveButtons;