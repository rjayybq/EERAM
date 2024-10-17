import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/Theme';
const SafeLocation = ({ navigation }) => {
  return (
    <ScrollView >
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('StudentPage')}>
             <Ionicons name="arrow-back" size={30}  />
        </Pressable>

        <View style={styles.container}>
           <Text style={styles.title}>Safe Location</Text>
        </View>
      </ScrollView> 
  )
}

export default SafeLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
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