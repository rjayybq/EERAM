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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Material from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const StudentHomePage = ({ navigation }) => {

  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };



  const { user, logout, fetchStudentWithGuardians } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  
  

  const emergencyContacts = [
    { name: '911', phone: '911', image: require('../assets/images/hotline call.png') },
    { name: 'BFP', phone: '02-8426-0219', image: require('../assets/images/BFP.png')  },
    { name: 'PNP', phone: '02-8722-0650', image: require('../assets/images/PNP.png') },
    { name: 'NDDRMC', phone: '02-8911-5601', image: require('../assets/images/NDRRMC.png') },
    { name: 'DOH', phone: '8711-1001', image: require('../assets/images/DOH.png') },
    { name: 'RED CROSS', phone: '143', image: require('../assets/images/Red Cross.png') }
  ];

  const makeCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch((err) => 
      console.error('Failed to make a call:', err)
    );
  };

 
  
  return (

    <SafeAreaView >
      
          <View style={styles.content}>
            {activeTab === 'Safe' && <Text style={styles.text}></Text>}
            {activeTab === 'Add' && <Text style={styles.text}></Text>}
            {activeTab === 'Announcement' && <Text style={styles.text}></Text>}
          </View>
       
          <TouchableOpacity onPress={handleLogout}>
            <Entypo name="log-out" size={30} style={styles.logout}/>
          </TouchableOpacity>   
     
          <View style={styles.header}>
              <Text style={styles.welcomeText}>Welcome, {user?.name || "Student"}!</Text>
          </View>
          
            

          
        <Text style={styles.title}>Emergency Contacts</Text>
       <View style={styles.container}>
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
      
        <View style={styles.formBar}>
          
          <View style={styles.tabBar}>
            <Pressable 
              style={styles.tabItem} 
              onPress={() => [handleTabPress('Safe'), navigation.navigate('Safe')]}
            >
              <FontAwesome5 name="running" size={30} color={activeTab === 'Safe' ? '#000' : '#666'} />
              <Text style={styles.tabText}>Safe Location</Text>
            </Pressable>

            <Pressable 
              style={styles.tabItem} 
              onPress={() => [handleTabPress('Add'), navigation.navigate('Add')]}
            >
              <Feather name="map-pin" size={30} color={activeTab === 'Add' ? '#000' : '#666'} />
              <Text style={styles.tabText}>Add</Text>
            </Pressable>

            <Pressable 
              style={styles.tabItem} 
              onPress={() => [handleTabPress('Announcement'), navigation.navigate('StudentAnnounce')]}
            >
                          <Material name="local-post-office" size={30} color={activeTab === 'Announcement' ? '#000' : '#666'} />
              <Text style={styles.tabText}>Announcement</Text>
            </Pressable>
          </View>
        </View>
      
    </SafeAreaView>       
  )
}

export default StudentHomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
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
    marginVertical: 520,
    elevation: 1,
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
    marginTop: 20,
    
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
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: FONTS.medium,
    marginBottom: 10
  },
  contactsContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    flexWrap: 'wrap', 
    justifyContent: 'space-evenly',
    
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 25
  },
  contactButton: {
    backgroundColor: COLORS.armyGreen,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '40%',
   
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