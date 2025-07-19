
import React from 'react';
import Spinner from './Spinner';

interface DemoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
}

const DemoButton: React.FC<DemoButtonProps> = ({ isLoading, children, ...props }) => {
    return (
        <button
            {...props}
            disabled={isLoading || props.disabled}
            className="bg-accent text-primary py-3 px-6 rounded-md font-bold hover:bg-accent-dark transition-all w-full flex items-center justify-center disabled:bg-secondary disabled:cursor-not-allowed disabled:text-text-secondary shadow-lg shadow-accent/20 hover:shadow-accent/30 disabled:shadow-none"
        >
            {isLoading ? (
                <>
                    <Spinner />
                    <span>Đang xử lý...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default DemoButton;