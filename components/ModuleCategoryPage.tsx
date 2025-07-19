import React, { useContext } from 'react';
import { ModuleKey, Page } from '../types';
import { ModuleInfo } from '../data/modules';
import ModuleCard from './ModuleCard';
import ReadyToTransform from './ReadyToTransform';
import { AuthContext, hasAccess } from '../contexts/AuthContext';

interface ModuleCategoryPageProps {
    pageTitle: string;
    pageDescription: string;
    modules: ModuleInfo[];
    onModuleClick: (moduleKey: ModuleKey) => void;
}

const ModuleCategoryPage: React.FC<ModuleCategoryPageProps> = ({ pageTitle, pageDescription, modules, onModuleClick }) => {
    const auth = useContext(AuthContext);
    const userPlan = auth.user?.plan || 'free';
    
    return (
        <div className="bg-primary animate-fade-in">
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold font-heading text-text-primary">{pageTitle}</h1>
                        <p className="mt-4 text-lg text-text-secondary max-w-3xl mx-auto">{pageDescription}</p>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {modules.map(module => (
                                <ModuleCard 
                                    key={module.moduleKey}
                                    moduleKey={module.moduleKey} 
                                    onClick={onModuleClick} 
                                    title={module.title} 
                                    description={module.description} 
                                    isAiPowered={module.isAiPowered}
                                    isLocked={!hasAccess(userPlan, module.requiredPlan)} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <ReadyToTransform />
        </div>
    );
};

export default ModuleCategoryPage;