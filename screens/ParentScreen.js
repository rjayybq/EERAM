import { StyleSheet, Text, View, Button, ScrollView,
  TouchableOpacity, Pressable, Image, Linking
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


const ParentScreen = ({navigation}) => {

  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
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

  const emergencyContacts = [
    { name: 'Phillipine National Emergency ', phone: '911', image: require('../assets/images/hotline call.png') },
    { name: 'Bureau of Fire Protection', phone: '02-8426-0219', image: require('../assets/images/BFP.png')  },
    { name: 'Philippine National Police', phone: '02-8722-0650', image: require('../assets/images/PNP.png') },
    { name: 'NDDRMC', phone: '02-8911-5601', image: require('../assets/images/NDRRMC.png') },
    { name: 'Department of Health', phone: '8711-1001', image: require('../assets/images/DOH.png') },
    { name: 'Phillipine National Red Cross ', phone: '143', image: require('../assets/images/Red Cross.png') }
  ];

  const makeCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch((err) => 
      console.error('Failed to make a call:', err)
    );
  };

  return (
    
      <SafeAreaView>
        <View style={styles.content}>
          {activeTab === 'Emergency' && <Text style={styles.text}></Text>}
          {activeTab === 'Add' && <Text style={styles.text}></Text>}
          {activeTab === 'Safe' && <Text style={styles.text}></Text>}

          

          
        </View>
       
       <TouchableOpacity onPress={handleLogout}>
          <Entypo name="log-out" size={30} style={styles.logout}/>
        </TouchableOpacity>   

          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome, {user?.name || "Guardian"}!</Text>
          </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Announcement</Text>
          <View style={styles.card}>
            <Text>School will be closed on Friday for maintenance.</Text>
          </View>

        </View>

        {/* Map View Section */}
        <ScrollView vertically={true}>
          <View style={styles.container}>
            <Text style={styles.title}>Emergency Contacts</Text>

              <View style={styles.contactsContainer}>
                {emergencyContacts.map((contact, index) => (
                  <TouchableOpacity key={index} style={styles.contactButton}  onPress={() => makeCall(contact.phone)}>
                    <Image source={contact.image} style={styles.contactImage} />
                    <Text style={styles.contactText}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                  </TouchableOpacity>
                ))}
              </View>
          </View>
         </ScrollView>

        
        

        <View style={styles.formBar}>
          <View style={styles.tabBar}>
          <Pressable 
            style={styles.tabItem} 
            onPress={() => [handleTabPress('Add'), navigation.navigate('Add')]}
          >
            <Entypo name="eye" size={30} color={activeTab === 'Add' ? '#000' : '#666'} />
            <Text style={styles.tabText}>Monitor</Text>
          </Pressable>

          {/* <Pressable 
            style={styles.tabItem} 
            onPress={() => [handleTabPress('Safe'), navigation.navigate('Safe')]}
          >
            <Icon name="map-marker" size={30} color={activeTab === 'Safe' ? '#000' : '#666'} />
            <Text style={styles.tabText}>Dko paalam ilalgay dito</Text>
          </Pressable> */}
          </View>
        </View>
      </SafeAreaView>
    
  )
}

export default ParentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
  },
  section: {
    marginVertical: 20,
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
    backgroundColor: COLORS.grey,  
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
    marginVertical: 10,
    
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

    marginTop: 15
  },
  tabText: {
    fontSize: 14,
    color: 'black',
    fontFamily: FONTS.medium,
    textAlign: 'center'
  },
  logout : {
    marginLeft: 350,
    marginTop: 15
  },
  header: {
    padding: 20,
    marginBottom: -17
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contactsContainer: {
    flexDirection: 'row', // Ensure contacts are arranged vertically
    justifyContent: 'center',
    flexWrap: 'wrap', // Center the contact buttons horizontally
    justifyContent: 'space-evenly',
    
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 20
  },
  contactButton: {
    backgroundColor: COLORS.armyGreen,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '30%',
    alignItems: 'center',
    
  },
  contactImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  contactText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  contactPhone: {
    color: 'white',
    fontSize: 14,
    marginTop: 5
  },
  
});