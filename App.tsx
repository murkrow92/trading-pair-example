import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { CryptoProvider } from './src/contexts/CryptoContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <CryptoProvider>
      <AppNavigator />
      <StatusBar style="dark" />
    </CryptoProvider>
  );
}
