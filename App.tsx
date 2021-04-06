import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/infrastructure/theme';
import { AppNavigator } from './src/infrastructure/navigation/app.navigator';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
};