import React from 'react'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children, className, ...props
}) => {
    return (
        <button 
            
            {...props}
            className={`bg-gradient-to-l from-fuchsia-400 to-purple-500 p-3 rounded-xl text-xl text-purple-800 font-bold focus:border-none focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all hover:text-purple-900 hover:from-fuchsia-300 hover:to-purple-400 cursor-pointer ${className}`}
        >
            {children}
        </button>
    )
}

export default Button