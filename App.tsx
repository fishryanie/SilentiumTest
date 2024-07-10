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
import {CustomToast} from 'components/common';

export default function App() {
  return (
    <SafeAreaProvider>
      <Routes />
      <CustomToast />
    </SafeAreaProvider>
  );
}
