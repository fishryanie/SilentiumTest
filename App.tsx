/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import 'moment/locale/vi';
import React from 'react';
import Routes from 'routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Routes />
    </SafeAreaProvider>
  );
}
