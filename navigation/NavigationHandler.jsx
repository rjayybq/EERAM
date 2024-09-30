import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Welcome from '../screens/Welcome'
import StudentScreen from '../screens/StudentScreen'
import ToDo from '../screens/ToDo'

const NavigationHandler = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Student' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Register' component={Register}/>
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='Student' component={StudentScreen}/>
            <Stack.Screen name='ToDo' component={ToDo}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationHandler