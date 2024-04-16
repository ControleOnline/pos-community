import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routers';

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'#1B5587'}
        />      
        <Routes />
      </NavigationContainer>
  );
}