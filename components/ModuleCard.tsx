import React from 'react';
import { ModuleKey } from '../types';

interface ModuleCardProps {
    title: string;
    description: string;
    moduleKey: ModuleKey;
    isAiPowered: boolean;
    onClick: (moduleKey: ModuleKey) => void;
    isLocked: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, moduleKey, isAiPowered, onClick, isLocked }) => {
    return (
        <button 
            onClick={() => !isLocked && onClick(moduleKey)}
            disabled={isLocked}
            className={`group relative bg-secondary/50 rounded-xl p-6 text-left flex flex-col transition-all duration-300
                       border ${isLocked ? 'border-white/5' : 'border-white/10 hover:border-accent/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10'}
                       focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary
                       ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
             {isLocked && (
                <div className="absolute top-3 right-3 z-20" aria-label="Locked">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd"></path></svg>
                </div>
            )}
             <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-grid-pattern bg-[length:2rem_2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex-grow flex flex-col">
                <div className="flex items-start mb-3">
                    <div className="flex-grow">
                        <h4 className={`font-bold font-heading text-lg ${isLocked ? 'text-text-secondary' : 'text-text-primary transition-colors group-hover:text-accent'}`}>{title}</h4>
                    </div>
                    {isAiPowered && (
                        <div className="relative flex-shrink-0 ml-4 mt-1" aria-label="AI Powered">
                            <div className={`w-2.5 h-2.5 rounded-full ${isLocked ? 'bg-text-secondary' : 'bg-accent'}`}></div>
                            {!isLocked && <div className="absolute inset-0 w-2.5 h-2.5 bg-accent rounded-full opacity-75 animate-ping"></div>}
                        </div>
                    )}
                </div>
                
                <p className="text-text-secondary text-sm flex-grow">
                    {description}
                </p>
            </div>
        </button>
    );
};

export default ModuleCard;