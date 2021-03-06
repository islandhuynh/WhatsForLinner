import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import "firebase/database";
import 'firebase/auth';

import { theme } from './src/infrastructure/theme';
import { AppNavigator } from './src/infrastructure/navigation/app.navigator';
import { FirebaseAuthProvider } from './src/services/authentification/firebase-auth';
import { LocationContextProvider } from './src/services/location/location-context';
import { RestaurantsContextProvider } from './src/services/restaurant/restaurant-context';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <FirebaseAuthProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <AppNavigator />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FirebaseAuthProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
};