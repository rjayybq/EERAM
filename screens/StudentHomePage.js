import { StyleSheet, Text, View, Button, ScrollView,
  TouchableOpacity, Pressable
} from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { COLORS, FONTS } from '../constants/Theme';
import { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const StudentHomePage = ({ navigation }) => {

  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };



  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name:  'Login' }],
    });
  };



  //   const logout = async () => {
  //     try {
          
  //         const token = await AsyncStorage.getItem('userToken');

  //         if (token) {
              
  //             const response = await axios.post('http://10.0.2.2:8001/api/logout', {}, {
  //                 headers: {
  //                     'Authorization': `Bearer ${token}`
  //                 }
  //             });

  //             if (response.data.status) {
                  
  //                 await AsyncStorage.removeItem('userToken');
                  
                 
  //                 navigation.reset({
  //                     index: 0,
  //                     routes: [{ name: 'Login' }],
  //                 });

  //                 alert(response.data.message);
  //             } else {
  //                 alert('Logout failed, please try again.');
  //             }
  //         }
  //     } catch (error) {
  //         console.error('Error logging out:', error);
  //         alert('An error occurred during logout. Please try again.');
  //     }
  // };



  return (

    <SafeAreaView >
      <ScrollView >
          <View style={styles.content}>
            {activeTab === 'Emergency' && <Text style={styles.text}></Text>}
            {activeTab === 'Add' && <Text style={styles.text}></Text>}
            {activeTab === 'Safe' && <Text style={styles.text}></Text>}
          </View>
       
          <TouchableOpacity onPress={handleLogout}>
            <Entypo name="log-out" size={30} style={styles.logout}/>
          </TouchableOpacity>   
     
          <View style={styles.header}>
              <Text style={styles.welcomeText}>Welcome, {user?.name || "Student"}!</Text>
            </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Announcement</Text>
            
            <View style={styles.card}>
              <Text>School will be closed on Friday for maintenance.</Text>
            </View>
            <View style={styles.contactContainer}>   
            </View>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Map View</Text>
        </View>

        
        

        <View style={styles.formBar}>
          
          <View style={styles.tabBar}>
            <Pressable 
              style={styles.tabItem} 
              onPress={() => [handleTabPress('Emergency'), navigation.navigate('Emergency')]}
            >
              <Ionicons name="call" size={30} color={activeTab === 'Emergency' ? '#000' : '#666'} />
              <Text style={styles.tabText}> Hotline</Text>
            </Pressable>

            <Pressable 
              style={styles.tabItem} 
              onPress={() => [handleTabPress('Add'), navigation.navigate('Add')]}
            >
              <Icon name="plus" size={30} color={activeTab === 'Add' ? '#000' : '#666'} />
              <Text style={styles.tabText}>Add</Text>
            </Pressable>

            <Pressable 
              style={styles.tabItem} 
              onPress={() => [handleTabPress('Safe'), navigation.navigate('Announcement')]}
            >
              <Icon name="map-marker" size={30} color={activeTab === 'Safe' ? '#000' : '#666'} />
              <Text style={styles.tabText}>Safe Location</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>       
  )
}

export default StudentHomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    backgroundColor: '#f2f2f2',
  },
  section: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: FONTS.light
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  contactButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
  },
  contactText: {
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  card: {
    backgroundColor: COLORS.fadeGreen,  
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formBar: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: COLORS.fadeGreen,
    marginHorizontal: 0,
    marginVertical: 345,
    
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: FONTS.medium
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    backgroundColor: COLORS.fadeGreen,
    
    
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  tabText: {
    fontSize: 15,
    color: 'black',
    fontFamily: FONTS.medium,
    textAlign: 'center'
  },
  logout : {
    marginLeft: 350,
    marginTop: 20
  },
  header: {
    padding: 20,
    marginBottom: -17
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: FONTS.medium
  },
});