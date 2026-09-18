import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]);

  const addItem = useCallback((product, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.id === product.id ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...current, { id: product.id, name: product.name, price: product.price, quantity }];
    });
  }, []);

  const setQuantity = useCallback((id, quantity) => {
    setLines((current) =>
      current
        .map((line) => (line.id === id ? { ...line, quantity } : line))
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const value = useMemo(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce((total, line) => total + line.price * line.quantity, 0);
    return { lines, addItem, setQuantity, removeItem, count, subtotal };
  }, [lines, addItem, setQuantity, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}
