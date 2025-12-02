import React from 'react';

// Card
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => (
  <div className={`bg-dark-card border border-white/5 rounded-xl p-6 shadow-lg hover:border-white/10 transition-colors ${className}`} {...props}>
    {children}
  </div>
);

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-neon text-white hover:bg-neon-light hover:shadow-neon border border-transparent",
    secondary: "bg-transparent border border-white/20 text-white hover:border-neon hover:text-neon",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props} />
  );
};

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm text-text-muted font-medium ml-1">{label}</label>}
    <input
      className={`bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all ${className}`}
      {...props}
    />
  </div>
);

// Select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm text-text-muted font-medium ml-1">{label}</label>}
    <select
      className={`bg-dark-bg border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all appearance-none ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// Badge
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  color?: 'neon' | 'blue' | 'green' | 'red' | 'yellow';
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'neon', className = '', ...props }) => {
  const colors = {
    neon: 'bg-neon/10 text-neon border-neon/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[color]} ${className}`} {...props}>
      {children}
    </span>
  );
};