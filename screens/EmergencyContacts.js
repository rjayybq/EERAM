import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/Theme';


const EmergencyContacts = ({navigation}) => {



  const emergencyContacts = [
    { name: 'Police', phone: '100', image: require('../assets/images/EERAM-logo.png') },
    { name: 'Ambulance', phone: '101', image: require('../assets/images/EERAM-logo.png')  },
    { name: 'Fire Department', phone: '102', image: require('../assets/images/EERAM-logo.png') },
    { name: 'Local Guardian', phone: '+1 234 567 890', image: require('../assets/images/EERAM-logo.png') },
    { name: 'Local Guardian', phone: '+1 234 567 890', image: require('../assets/images/EERAM-logo.png') },
    { name: 'Local Guardian', phone: '+1 234 567 890', image: require('../assets/images/EERAM-logo.png') }
  ];

  return (
 
       <ScrollView >
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('StudentPage')}>
             <Ionicons name="arrow-back" size={30}  />
        </Pressable>

        <View style={styles.container}>
           <Text style={styles.title}>Emergency Contacts</Text>

            <View style={styles.contactsContainer}>
              {emergencyContacts.map((contact, index) => (
                <TouchableOpacity key={index} style={styles.contactButton}>
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
    marginVertical: 50
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
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '40%',
    alignItems: 'center',
    
  },
  contactImage: {
    width: 90,
    height: 60,
    marginBottom: 10,
  },
  contactText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
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