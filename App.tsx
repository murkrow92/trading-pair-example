import React from 'react';
import { StatusBar } from 'expo-status-bar';
import './src/i18n';
import { CurrencyProvider } from './src/contexts/CryptoContext';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import { QueryProvider } from './src/providers/QueryProvider';
import { AppNavigator } from './src/navigation/AppNavigator';

const AppContent = () => {
  const { isDark } = useTheme();
  
  return (
    <>
      <AppNavigator />
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
};

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <CurrencyProvider>
          <AppContent />
        </CurrencyProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
