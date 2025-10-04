import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import './src/i18n';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import { QueryProvider } from './src/providers/QueryProvider';
import { AppNavigator } from './src/navigation/AppNavigator';
import { initializeApp } from './src/store/appStore';

const AppContent = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    initializeApp();
  }, []);

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
        <AppContent />
      </ThemeProvider>
    </QueryProvider>
  );
}
