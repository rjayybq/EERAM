import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/Theme';
import { Linking } from 'react-native';

const EmergencyContacts = ({navigation}) => {



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
 
       <ScrollView >
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('StudentPage')}>
             <Ionicons name="arrow-back" size={30}  />
        </Pressable>

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
   
  )
}

export default EmergencyContacts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginVertical: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactsContainer: {
    flexDirection: 'row', // Ensure contacts are arranged vertically
    justifyContent: 'center',
    flexWrap: 'wrap', // Center the contact buttons horizontally
    justifyContent: 'space-evenly',
    
    
  },
  contactButton: {
    backgroundColor: COLORS.armyGreen,
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '40%',
    alignItems: 'center',
    
  },
  contactImage: {
    width: 88,
    height: 80,
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
  backButton: {
    marginTop: 50,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    width: "15%",
    backgroundColor: COLORS.green
  }
});