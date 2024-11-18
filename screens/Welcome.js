import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '../constants/Theme'; 
import eeram from '../assets/images/EERAM-logo.png'

const Welcome = ({ navigation }) => {
  return (
    <View colors={['#AEEEEE', '#B2E0B2']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={eeram} style={styles.logo} />
        <Text style={styles.title}>Welcome to the Edu Emergency Risk Assessment Monitoring System</Text>
        <Text style={styles.tagline}>"Your safety, our mission!"</Text>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        
       
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Privacy Policy</Text>
        <Text style={styles.footerText}>|</Text>
        <Text style={styles.footerText}>Terms of Service</Text>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: FONTS.bold,
    color: COLORS.darkBlue,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: FONTS.light,
    color: COLORS.darkGrey,
  },
  loginButton: {
    backgroundColor: COLORS.fadeGreen,
    width: '80%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  registerButton: {
    backgroundColor: COLORS.darkGreen,
    width: '80%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
   
  },
  illustration: {
    width: '100%',
    height: 150,
    marginTop: 20,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: COLORS.lightGrey,
    fontSize: 14,
  },
});
