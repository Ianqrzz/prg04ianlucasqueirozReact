import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * useAuth - Hook para acessar contexto de autenticação
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
