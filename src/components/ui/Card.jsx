import React from 'react';
import './UIComponents.css';

/**
 * Card - Componente de card reutilizável
 */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};
