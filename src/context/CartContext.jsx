import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';

/**
 * CartContext - Gerencia carrinho de compras
 * Polido para evitar re-renderizações desnecessárias e race conditions de state.
 */
export const CartContext = createContext();

const CART_STORAGE_KEY = '@074Diversao:cart';

export const CartProvider = ({ children }) => {
  // 1. Lazy Initialization: Lê o storage antes de renderizar a primeira vez
  const [items, setItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error('Erro ao carregar carrinho:', err);
      return [];
    }
  });

  // 2. Sincroniza com localStorage SEMPRE que 'items' mudar
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // 3. Derived State: Calcula o total automaticamente sem precisar de outro useState
  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + ((item.preco || 0) * (item.quantidade || 1));
    }, 0);
  }, [items]);

  // Calcula a quantidade total de itens (útil para o Navbar)
  const totalItemsCount = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantidade || 1), 0);
  }, [items]);

  // Envolto em useCallback para estabilidade de memória
  const addToCart = useCallback((product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Se já existe, apenas aumenta quantidade
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      // Se não existe, adiciona novo, previnindo bugs com nomes de atributos do BD
      return [
        ...prevItems,
        {
          id: product.id,
          nome: product.nome,
          preco: product.preco,
          imagemUrl: product.imagemUrl || product.imagem_url, 
          quantidade: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantidade: quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        totalItemsCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};