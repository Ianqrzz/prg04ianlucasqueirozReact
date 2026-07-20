import React from 'react';
import './UIComponents.css';

/**
 * Loading - Componente de loading
 */
export const Loading = ({ message = 'Carregando...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};
