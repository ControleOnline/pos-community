import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,

} from 'react-native';

import Orders from './pages/orders';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#1B5587'}
      />
      
      <Orders/>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(
  {
    container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    },
  }
);

export default App;
