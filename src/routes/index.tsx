import React from 'react';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from 'types/routes';
import screens from 'screens';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function Routes() {
  const handleReadyNavigation = () => {};
  return (
    <NavigationContainer ref={navigationRef} onReady={handleReadyNavigation}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="NewsScreen" component={screens.NewsScreen} />
        <Stack.Screen name="NewsDetailScreen" component={screens.NewsDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
