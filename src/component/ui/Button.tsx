import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "cursor-pointer px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-[#2546A6] text-white hover:bg-[#1e3a8a] shadow-lg shadow-blue-900/10",
    secondary:
      "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200",
    ghost: "text-slate-500 hover:bg-slate-100",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
