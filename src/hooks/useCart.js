import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * useCart - Hook para acessar contexto de carrinho
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};
