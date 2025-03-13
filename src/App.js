import React, {useState, useEffect} from 'react';
import {StatusBar, View, ActivityIndicator, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '@controleonline/ui-common/src/api';
import {ThemeProvider} from '@controleonline/ui-layout/src/react/components/ThemeProvider';

const createLocalStorageSync = async () => {
  let store = {};

  try {
    const keys = await AsyncStorage.getAllKeys();
    const pairs = await AsyncStorage.multiGet(keys);
    pairs.forEach(([key, value]) => {
      store[key] = value;
    });
  } catch (error) {
    console.error('Erro ao carregar dados do AsyncStorage:', error);
  }

  return {
    getItem: key => store[key] || {},
    setItem: (key, value) => {
      store[key] = value;
      AsyncStorage.setItem(key, value).catch(error =>
        console.error('Erro ao salvar no AsyncStorage:', error),
      );
    },
    removeItem: key => {
      delete store[key];
      AsyncStorage.removeItem(key).catch(error =>
        console.error('Erro ao remover do AsyncStorage:', error),
      );
    },
    clear: () => {
      store = {};
      AsyncStorage.clear().catch(error =>
        console.error('Erro ao limpar o AsyncStorage:', error),
      );
    },
  };
};

export default function App() {
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    createLocalStorageSync().then(localStorageSync => {
      window.localStorage = localStorageSync;
      window.api = api;
      setStorageReady(true);
    });
  }, []);
  if (!storageReady) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#1B5587" />
        <Text style={{marginTop: 10}}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} backgroundColor={'#1B5587'} />
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
