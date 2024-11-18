import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { FONTS } from '../constants/Theme';
import blurry from '../assets/images/blurry.jpg';
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#698a71',
  },
  text: {
    fontSize: 17,
    fontFamily: FONTS.medium,
  }
});

export default LoadingScreen;
