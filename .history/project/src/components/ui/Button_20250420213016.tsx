// src/components/ui/Button.tsx

import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'outline' | 'solid';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'solid',
  size = 'md',
  icon,
  disabled = false,
}) => {
  const buttonClasses = `btn ${variant} ${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
};

export { Button };
