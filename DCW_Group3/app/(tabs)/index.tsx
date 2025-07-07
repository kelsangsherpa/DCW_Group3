import React from 'react';
import { CartProvider } from '../../context/CartContext';
import HomeScreen from '../screens/HomeScreen';

export default function Index() {
  return (
    <CartProvider>
      <HomeScreen />
    </CartProvider>
  );
}
