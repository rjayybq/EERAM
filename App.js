import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationHandler from './navigation/NavigationHandler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './context/AuthContext';
import { navigationRef } from './components/navigationRef';

export default function App() {
  
  const [loaded, error] = useFonts({
    'Regular': require('./assets/font/Poppins-Regular.ttf'),
    'Medium': require('./assets/font/Poppins-Medium.ttf'),
    'Light': require('./assets/font/Poppins-Light.ttf'),
    'Semi-Bold': require('./assets/font/Poppins-SemiBold.ttf'),
    'Bold': require('./assets/font/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
         <NavigationHandler />
      </NavigationContainer>
  </AuthProvider>
  );
}

const styles = StyleSheet.create({

});
