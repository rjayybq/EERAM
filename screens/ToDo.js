import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ToDo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What to Do</Text>
      <View style={styles.card}>
        <Text>If you feel unsafe, contact a teacher or reach out to the emergency contacts listed.</Text>
      </View>
    </View>

  )
}

export default ToDo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});