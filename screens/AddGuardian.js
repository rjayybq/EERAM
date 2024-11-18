import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/Theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddGuardian = ({ navigation}) => {
  const [studentId, setStudentId] = useState('');
  const [guardianId, setGuardianId] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPassword, setGuardianPassword] = useState('');
  const [message, setMessage] = useState('');

  const addGuardian = async () => {
    try {
      const token = '7|cQ5nFGqAtWfmLVkGhs0gm5YygRxPnSAuLDGmnYQG0f9154ea';
      // const token = await AsyncStorage.getItem('token');
      // if (!token) {
      //   Alert.alert("Error", "Please log in first.");
      //   return;
      // }
  
      const response = await axios.post(
        'http://10.0.2.2:8001/api/add-guardian',
        {
          student_id: studentId,
          
          name: guardianName,
          password: guardianPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.status) {
        Alert.alert("Success", "Guardian added successfully");
      } else {
        Alert.alert("Failed", response.data.message);
      }
    } catch (error) {
      console.error("Error adding guardian:", error);
      Alert.alert("Error", error.response?.data?.message || "Network error");
    }
  };
  

  return (
    <ScrollView style={styles.scrollView}>
    <Pressable style={styles.backButton} onPress={() => navigation.navigate('StudentPage')}>
      <Ionicons name="arrow-back" size={30} />
    </Pressable>

    <View style={styles.container}>
      <Text style={styles.title}>Add Guardian</Text>
      <Text>{message}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        value={studentId}
        onChangeText={(text) => setStudentId(text)}
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        placeholder="Guardian ID"
        value={guardianId}
        onChangeText={(text) => setGuardianId(text)}
        keyboardType="default"
      />
  
      <TextInput
        style={styles.input}
        placeholder="Guardian Name"
        value={guardianName}
        onChangeText={(text) => setGuardianName(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={guardianPassword}
        onChangeText={(text) => setGuardianPassword(text)}
      />

      <Pressable style={styles.submitButton} onPress={addGuardian} >
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