import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/Theme';

const AddGuardian = ({ navigation}) => {
  

  return (
    <ScrollView style={styles.scrollView}>
    <Pressable style={styles.backButton} onPress={() => navigation.navigate('StudentPage')}>
      <Ionicons name="arrow-back" size={30} />
    </Pressable>

    <View style={styles.container}>
      <Text style={styles.title}>Add Guardian</Text>
     
      <TextInput
        style={styles.input}
        placeholder="Guardian Name"
        placeholderTextColor="#999"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      <Pressable style={styles.submitButton} >
        <Text style={styles.submitButtonText}>Add Guardian</Text>
      </Pressable>

      <Text style={styles.infoText}>
        Please make sure to provide accurate information for the guardian.
      </Text>
    </View>
  </ScrollView>
  )
}

export default AddGuardian

const styles = StyleSheet.create({
   scrollView: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.darkBlue, // Change to a darker color for better contrast
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // For Android shadow effect
  },
  backButton: {
    marginTop: 50,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    width: '15%',
    backgroundColor: COLORS.green,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.green,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoText: {
    marginTop: 15,
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
});