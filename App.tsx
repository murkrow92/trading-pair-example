import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { CurrencyProvider } from './src/contexts/CryptoContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <CurrencyProvider>
      <AppNavigator />
      <StatusBar style="dark" />
    </CurrencyProvider>
  );
}
