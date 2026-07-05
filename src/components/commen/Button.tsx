import React from 'react';

// Button na default html attributes extend karya chhe jethi onClick વગેરે કામ કરે
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean; // Loading state check karva mate optional prop
}

export default function Button({ children, isLoading, disabled, className = '', ...props }: ButtonProps) {
  return (
    <button
      // Jo loading chalto hoy to button ne disabled rakho jethi user fari click na kare
      disabled={isLoading || disabled}
      className={`w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/70 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg disabled:cursor-not-allowed active:scale-[0.98] ${className}`}
      {...props}
    >
      {/* Jo isLoading true hoy to j aa loading round (spinner) dekhase */}
      {isLoading && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
      
      {/* Button no main text ahiya aavshe */}
      <span>{isLoading ? "Loading..." : children}</span>
    </button>
  );
}