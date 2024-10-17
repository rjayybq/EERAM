import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Login'
import Register from '../screens/Register'
import Welcome from '../screens/Welcome'
import ToDo from '../screens/ToDo'

import EmergencyContacts from '../screens/EmergencyContacts'
import ParentScreen from '../screens/ParentScreen'
import StudentHomePage from '../screens/StudentHomePage'
import AddGuardian from '../screens/AddGuardian'
import SafeLocation from '../screens/SafeLocation';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';

const NavigationHandler = () => {
    const Stack = createNativeStackNavigator();

    const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />; // Show a loading spinner or splash screen while checking auth state
  }

    
  return (
    <Stack.Navigator >
      {user ? (
        // If user is logged in, show the appropriate home screen
        user.role === 'student' ? (
          <>
          <Stack.Screen name="StudentPage" component={StudentHomePage} options={{ headerShown:false }} />
          <Stack.Screen name="Emergency" component={EmergencyContacts} options={{ headerShown:false }} />
          <Stack.Screen name="Add" component={AddGuardian} options={{ headerShown:false }} />
          <Stack.Screen name="Safe" component={SafeLocation} options={{ headerShown:false }} />
          </>
         
        ) : (
          <>
            <Stack.Screen name="Guardian" component={ParentScreen} options={{ headerShown:false }} />
           
          </>
          
        )
      ) : (
        // If no user is logged in, show the login screen
        <Stack.Screen name="Login" component={Login} options={{ headerShown:false }} />
      )}

      <Stack.Screen name='Register' component={Register} options={{ headerShown:false }}/>
    </Stack.Navigator>

  )
}

export default NavigationHandler