import React from 'react'

const Spinner: React.FC<React.HTMLAttributes<HTMLElement>> = ({ 
    className, ...props
}) => {
    return (
        <div className="flex justify-center items-center">
            <div 
                className={`animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-purple-800 rounded-full ${className}`}
                role="status" 
                aria-label="loading"
                {...props}
            >
                <span className="sr-only visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner