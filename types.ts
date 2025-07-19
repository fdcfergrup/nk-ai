export type UserPlan = 'free' | 'personal' | 'premium' | 'team' | 'enterprise';

export interface User {
    email: string;
    plan: UserPlan;
    usage: {
        aiRequests: {
            used: number;
            total: number;
        };
        financialAiRequests?: {
            used: number;
            total: number;
        };
    };
}

export type Page = 
  | 'landing' 
  | 'product-policy' 
  | 'terms-of-service' 
  | 'governance'
  | 'marketing'
  | 'operations'
  | 'utilities'
  | 'financial-tools'
  | 'pricing'
  | 'crm-dashboard'
  | 'hrm-dashboard'
  | 'sales-dashboard'
  | 'okrs-dashboard'
  | 'auth'
  | 'account';

export type ModuleKey =
  // Governance
  | 'finance' | 'crm' | 'hrm' | 'sales'
  | 'goal-setting' | 'strategic-risk' | 'meeting-summary' | 'performance-review'
  | 'competitor-analysis' | 'decision-framework' | 'lead-scoring-assist' | 'internal-comms'
  | 'budget-proposal' | 'training-planner'
  | 'document-analyzer' | 'project-planner'
  // Marketing
  | 'email' | 'social' | 'content' | 'lead' | 'analytics' | 'ads' | 'video' | 'event'
  | 'content-strategy' | 'persona-generator' | 'ab-test-ideas' | 'social-calendar'
  | 'pr-outreach' | 'influencer-discovery' | 'journey-mapper' | 'brand-voice'
  | 'product-naming' | 'slogan-generator' | 'competitor-ad-analysis' | 'market-research-qs'
  | 'webinar-topic-ideas' | 'testimonial-polisher' | 'seo-keyword-cluster' | 'affiliate-email'
  | 'seo-optimizer' | 'ad-copy-generator'
  // Operations
  | 'supply-chain' | 'quality' | 'maintenance' | 'risk' | 'asset'
  | 'process-optimization' | 'inventory-forecasting' | 'logistics-planner' | 'safety-protocol-writer'
  | 'cost-reduction-ideas' | 'supplier-evaluation' | 'workflow-automation' | 'incident-report-analyzer'
  | 'kpi-dashboard-designer' | 'facility-layout-optimizer'
  | 'inventory-optimizer' | 'data-anomaly-detector'
  // Utilities
  | 'summarize' | 'convert' | 'password' | 'qr-generator' | 'word-counter' | 'headline' | 'palette' | 'unit-converter' | 'currency-converter'
  | 'grammar-checker' | 'sentence-rephraser' | 'email-assistant' | 'presentation-outline' | 'interview-questions'
  | 'youtube-summarizer' | 'excel-formula' | 'regex-generator' | 'sentiment-analysis' | 'info-extractor'
  | 'task-checklist' | 'cornell-notes' | 'meeting-agenda' | 'personal-swot' | 'pomodoro-timer'
  | 'mind-map-generator' | 'fake-data-generator' | 'text-to-json' | 'project-name-generator' | 'out-of-office-generator'
  // New Utilities
  | 'contract-drafter' | 'product-description' | 'review-responder' | 'idea-brainstormer' | 'text-simplifier'
  | 'argument-builder' | 'brand-name-generator' | 'email-classifier' | 'speech-writer' | 'quote-finder'
  | 'thank-you-note-writer' | 'brand-story-generator' | 'competitor-keyword' | 'tos-summarizer'
  | 'support-script-generator' | 'quick-report-generator' | 'translate-improve'
  // Financial Tools
  | 'dcf-valuation' | 'ratio-analysis' | 'wacc-calculator'
  | 'investment-roi' | 'break-even-analysis' | 'npv-irr-calculator'
  | 'portfolio-allocator' | 'eps-calculator' | 'rsi-calculator' | 'macd-calculator'
  | 'bollinger-bands' | 'fibonacci-retracement' | 'moving-average' | 'stochastic-oscillator'
  | 'obv-calculator' | 'atr-calculator' | 'support-resistance' | 'candlestick-pattern'
  // New Financial Tools
  | 'economic-event-analyzer' | 'earnings-call-summarizer' | 'risk-reward-calculator' | 'options-strategy-suggester'
  | 'crypto-onchain-interpreter' | 'ipo-analysis-assistant' | 'technical-pattern-screener' | 'portfolio-diversification-checker'
  | 'market-sentiment-analyzer' | 'trading-psychology-coach';


export interface ModuleTemplate {
    title: string;
    isAiPowered: boolean;
    html: () => React.ReactNode;
    prompt?: (input: string, context?: string) => string;
    initialContextValue?: string;
}