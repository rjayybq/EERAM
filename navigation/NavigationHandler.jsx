import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Welcome from '../screens/Welcome';
import ToDo from '../screens/ToDo';
import EmergencyContacts from '../screens/EmergencyContacts';
import ParentScreen from '../screens/ParentScreen';
import StudentHomePage from '../screens/StudentHomePage';
import AddGuardian from '../screens/AddGuardian';
import SafeLocation from '../screens/SafeLocation';
import LoadingScreen from '../components/LoadingScreen';
import AnnouncementsScreen from '../screens/AnnouncementScreen';

const NavigationHandler = () => {
  const Stack = createNativeStackNavigator();
  const { user, loading } = useContext(AuthContext);

  // Show a loading spinner or splash screen while checking auth state
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator>
      {user ? (
        
        user.role === 'guardian' ? (
          <>
            <Stack.Screen name="Guardian" component={ParentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Announcement" component={AnnouncementsScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="StudentPage" component={StudentHomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Emergency" component={EmergencyContacts} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={AddGuardian} options={{ headerShown: false }} />
            <Stack.Screen name="Safe" component={SafeLocation} options={{ headerShown: false }} />
            <Stack.Screen name="Announcement" component={AnnouncementsScreen} options={{ headerShown: false }} />
          </>
        )
      ) : (
        // 
        <>
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </>
      )}

    </Stack.Navigator>
  );
};

export default NavigationHandler;
