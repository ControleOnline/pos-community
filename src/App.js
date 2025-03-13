import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import { Provider } from 'react-redux';
import Routes from './routers';
import AsyncStorage from '@react-native-async-storage/async-storage';

window.LocalStorage = AsyncStorage;
import {api} from '@controleonline/ui-common/src/api';
window.api = api;

import {ThemeProvider} from '@controleonline/ui-layout/src/react/components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} backgroundColor={'#1B5587'} />
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
    // </Provider>
  );
}
