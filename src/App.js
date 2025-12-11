import React, {useState, useEffect} from 'react';
import {StatusBar, View, ActivityIndicator, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '@controleonline/ui-common/src/api';
import {DefaultProvider} from '@controleonline/ui-common/src/react/components/DefaultProvider';
//import {StoreProvider} from '@store';
import CheckLogin from '@controleonline/ui-login/src/react/components/CheckLogin';
import {PaperProvider} from 'react-native-paper';
import {MessageProvider} from '@controleonline/ui-common/src/react/components/MessageService';
//import TouchSoundProvider from '@controleonline/ui-common/src/react/components/TouchSoundProvider';
//import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
    getItem: key => {
      let value = store[key];
      const cleanString =
        typeof value === 'string' && value.startsWith('__q_objt|')
          ? value.substring('__q_objt|'.length)
          : value;

      return cleanString;
    },
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
  const [navigationReady, setNavigationReady] = useState(false);

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
    //<GestureHandlerRootView style={{flex: 1}}>
    //  <TouchSoundProvider>
    //<StoreProvider>
      <PaperProvider>
        <MessageProvider>
          <DefaultProvider>
            <NavigationContainer onReady={() => setNavigationReady(true)}>
              <StatusBar
                barStyle={'light-content'}
                backgroundColor={'#1B5587'}
              />
              {navigationReady && <CheckLogin />}
              <Routes />
            </NavigationContainer>
          </DefaultProvider>
        </MessageProvider>
      </PaperProvider>
    //</StoreProvider>
    //</TouchSoundProvider>
    //</GestureHandlerRootView>
  );
}
