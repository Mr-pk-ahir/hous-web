import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default function Input({ type = "text", placeholder, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const currentType = isPasswordType ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full h-14 border border-gray-300 rounded-2xl bg-white/80 overflow-hidden flex items-center transition-all duration-300 focus-within:border-yellow-500 focus-within:ring-2 focus-within:ring-yellow-500/30">
      <input
        type={currentType}
        placeholder={placeholder}
        className="w-full h-full px-5 py-2 bg-transparent outline-none border-none text-gray-800 placeholder-gray-500 font-medium"
        {...props}
      />
      
      {isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="px-4 text-gray-500 hover:text-yellow-500 transition-colors cursor-pointer outline-none flex items-center justify-center"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      )}
    </div>
  );
}