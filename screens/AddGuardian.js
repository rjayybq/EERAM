import { StyleSheet, Text, View, TextInput, ScrollView, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/Theme';

const AddGuardian = ({ navigation}) => {
  return (
    <ScrollView >
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('StudentPage')}>
             <Ionicons name="arrow-back" size={30}  />
        </Pressable>

        <View style={styles.container}>
           <Text style={styles.title}>Add Guardian</Text>
        </View>
      </ScrollView> 
  )
}

export default AddGuardian

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
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