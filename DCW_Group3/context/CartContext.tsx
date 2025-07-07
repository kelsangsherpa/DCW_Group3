import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define types
export type CartItem = {
  id: string;
  title: string;
  price: number;
};

export type Appointment = {
  date: string;
  time: string;
};

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  appointment: Appointment | null;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment | null>>;
}

// Create context with default value
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider props
interface CartProviderProps {
  children: ReactNode;
}

// Provider component
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, appointment, setAppointment }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook (optional, recommended)
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

