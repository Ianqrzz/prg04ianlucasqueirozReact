import React from 'react';
import './UIComponents.css';

/**
 * Button - Componente de botão reutilizável
 */
export const Button = ({
  children,
  variant = 'primary', // primary, secondary, danger, outline
  size = 'md', // sm, md, lg
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
