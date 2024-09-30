import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import eeram from '../assets/images/EERAM-logo.png'
import bgImg from '../assets/images/BG.jpg'
import { COLORS } from '../constants/Theme'



const Welcome = ({navigation}) => {
  return (
<View style={styles.container}>
<ImageBackground source={bgImg} resizeMode="cover" style={styles.bgImg}>
        <Image resizeMode='contain' source={eeram} style={styles.welcomeLogo} />
        <Text style={styles.welcomeTitle}>Edu Emergency Risk Assessment {"\n"} Monitoring System</Text>
        <TouchableOpacity style={styles.Btn}>
            <Pressable style={styles.welcomeBtn1} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.btnText}>Login</Text>
            </Pressable>
            <Pressable style={styles.welcomeBtn2} onPress={ () => navigation.navigate('Register') }>
                <Text style={styles.btnText}>Register</Text>
            </Pressable>
        </TouchableOpacity>
</ImageBackground>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light
      },
      welcomeLogo: {
        width: 300,
        marginBottom: -160
      },
      welcomeTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 80,
        fontFamily: "light"
      },
      welcomeBtn1: {
        borderWidth: 1,
        width: 150,
        height: 50,
        borderRadius: 10,
        backgroundColor: COLORS.fadeGreen,
        marginHorizontal: 10, 
      },
      welcomeBtn2: {
        borderWidth: 1,
        width: 150,
        height: 50,
        borderRadius: 10,
        backgroundColor: COLORS.darkGreen,
        
      },
      Btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
        
      },
      btnText: {
        textAlign: 'center',
        padding: 15,
        color: 'black',
      },
      bgImg: {
        
      }
});