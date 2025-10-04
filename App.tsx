import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { CurrencyProvider } from './src/contexts/CryptoContext';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { QueryProvider } from './src/providers/QueryProvider';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <CurrencyProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </CurrencyProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
