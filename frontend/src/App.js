import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigations from './navigations';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.background}
        barStyle="dark-content"
      ></StatusBar>
      <Navigations></Navigations>
    </ThemeProvider>
  );
}
