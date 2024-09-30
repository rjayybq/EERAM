import { StyleSheet, Text, View, Image, TextInput, ImageBackground, Pressable, Alert } from 'react-native'
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants/Theme';
import logo from '../assets/images/UDD-LOGO.png';
import bgImg from '../assets/images/BG.jpg'

  

const Login = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginPress = () => {
    signin(email, password);
    setEmail("");
    setPassword("");
  };
  return (
      <View style={styles.loginContainer}>
      <StatusBar style="auto"></StatusBar>
      <ImageBackground source={bgImg} resizeMode="cover" style={styles.bgImg}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={logo}
          ></Image>
        </View>
        <View>
          <Text style={styles.appName}>
            EDU EMERGENCY RISK ASSESSMENT{"\n"}
          </Text>
          <Text style={styles.appNamePrimary}>MONITORING</Text>
          <Text style={styles.appNamePrimary2}>SYSTEM</Text>
        </View>
      </ImageBackground>

      <View style={styles.formContainer}>
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.formInput}
        ></TextInput>
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.formInput}
        ></TextInput>
        <Text style={styles.forgot}>Dont have an account?</Text>
        <Text
          style={styles.forgot}
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Text>
        <View style={styles.outerButton}>
          <Pressable
            android_ripple={{ color: COLORS.green }}
            style={styles.innerButton}
            onPress={handleLoginPress}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </Pressable>
        </View>
      </View>
      
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  bgImg: {
    width: "100%",
    height: 400,
    alignItems: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    overflow: "hidden",
    marginTop: 80,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  appName: {
   
    textAlign: "center",
    fontSize: 20,
    lineHeight: 20,
    color: "#000",
  },
  appNamePrimary: {
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 10,
    fontSize: 25,
    lineHeight: 25,
    marginTop: -20,
    elevation: 3,
  },
  appNamePrimary2: {
    textAlign: "center",
    
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 10,
    fontSize: 40,
    lineHeight: 40,
  },
  formContainer: {
    marginVertical: 30,
    width: 340,
    height: 235,
    paddingVertical: 30,
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    marginTop: -80,
    elevation: 5,
  },
  formInput: {
    width: 280,
    height: 50,
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 14,
    
    color: COLORS.lightGrey,
    elevation: 3,
  },
  outerButton: {
    margin: 20,
    width: 110,

    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: COLORS.green,
  },
  innerButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  buttonText: {
    color: "#fff",
    
    fontSize: 15,
    textAlign: "center",
  },
  forgot: {
    flexDirection: 'row',
    color: COLORS.secondary,
  },
  footer: {
    marginTop: "auto",
    width: "80%",
    marginBottom: 10,
   
  },
  footerText: {
    
    
    fontSize: 12,
    color: 'black',
  },
});