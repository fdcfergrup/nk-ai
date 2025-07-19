
import React from 'react';
import SaveButtons from './SaveButtons';

interface AiResponseProps {
    content: string | null;
    showSaveButtons?: boolean;
    onSave: (provider: 'google' | 'onedrive') => void;
}

const AiResponse: React.FC<AiResponseProps> = ({ content, showSaveButtons, onSave }) => {
    if (!content) return null;

    return (
        <div className="mt-4">
            <h4 className="font-semibold text-sm text-text-secondary">Phản hồi từ Trợ lý AI:</h4>
            <div className="bg-secondary/50 backdrop-blur-sm border-l-4 border-accent p-4 rounded-r-lg mt-2 whitespace-pre-wrap font-sans text-sm text-text-primary shadow-lg">
                {content}
            </div>
            {showSaveButtons && <SaveButtons onSave={onSave} />}
        </div>
    );
};

export default AiResponse;