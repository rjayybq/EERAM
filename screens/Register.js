import { StyleSheet,
   Text,
    View,
    Image,
    TextInput, 
    ImageBackground,
    Pressable, Alert,
    TouchableWithoutFeedback,
     Keyboard,
    ScrollView, 
    KeyboardAvoidingView, ActivityIndicator} from 'react-native'
import { BlurView } from '@react-native-community/blur';
import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants/Theme';
import { FONTS } from '../constants/Theme';
import { Picker } from '@react-native-picker/picker';
import logo from '../assets/images/UDD-LOGO.png';
import uddBG from '../assets/images/UDD-BG.jpg'
import bgImg from '../assets/images/BG.jpg'
import axios from 'axios';
import Login from './Login';
const Register = ({navigation}) => {



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('guardian');
  const [studentId, setStudentId] = useState('');
  const [relationshipToStudent, setRelationshipToStudent] = useState('');
  const [ course, setCourse] = useState('');
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState();


  const handleRegister = async () => {
    
    if (!name || !email || !password || 
        (role === 'student' && (!studentId || !course)) || 
        (role === 'guardian' && !relationshipToStudent)) {
      setMessage('All fields are required.');
      return;
    }
      setLoading(true);
       setMessage(''); 

    
    try {
      const payload = {
        name,
        email,
        password,
        student_id: studentId,
        course,
        relationship_to_student: relationshipToStudent,
      };
  
      
      
      const endpoint = role === 'student' ? 'register/student' : 'register/guardian';
      const response = await axios.post(`http://10.0.2.2:8001/api/${endpoint}`, payload, );
  
      
  
      console.log('Response Data:', response.data);
      if (response.data.message && response.data.message.includes('registered successfully')) {
        navigation.navigate('Login');
      } else {
        setMessage(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      setMessage('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.loginContainer}>
            <StatusBar style="auto"></StatusBar>
            <ImageBackground source={uddBG} resizeMode="cover" style={styles.bgImg}>
              <View style={styles.overlay}></View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode="contain" source={logo}></Image>
              </View>
              <View>
                <Text style={styles.appName}>Edu-Emergency Risk Assessment</Text>
                <Text style={styles.appNamePrimary}>MONITORING</Text>
                <Text style={styles.appNamePrimary2}>SYSTEM</Text>
              </View>
            </ImageBackground>

            <View style={styles.formContainer}>
              <Text style={styles.validation}>{message}</Text>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.formInput}
              />
              <TextInput
                keyboardType="email-address"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.formInput}
              />
              <TextInput
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.formInput}
              />
              <Picker style={styles.formInput} selectedValue={role} onValueChange={setRole}>
              
                <Picker.Item label="Guardian" value="guardian" />
              </Picker>
              {/* Conditional fields based on the role */}
              {role === 'student' && (
                <>
                  <TextInput
                    placeholder="Student ID"
                    style={styles.formInput}
                    value={studentId}
                    onChangeText={setStudentId}
                  />
                  <TextInput
                    placeholder="Course"
                    style={styles.formInput}
                    value={course}
                    onChangeText={setCourse}
                  />
                </>
              )}
              {role === 'guardian' && (
                <TextInput
                  placeholder="Relationship to Student"
                  style={styles.formInput}
                  value={relationshipToStudent}
                  onChangeText={setRelationshipToStudent}
                />
              )}

              <Text style={styles.forgot}>have an account?</Text>
              <Text style={styles.forgot} onPress={() => navigation.replace("Login")}>
                Login
              </Text>
              <View style={styles.outerButton}>
                <Pressable
                  android_ripple={{ color: COLORS.ripplePrimary }}
                  style={styles.innerButton}
                  onPress={handleRegister}
                >
                   {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Register</Text>
                    )}
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: "center",
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
    // marginTop: -10,
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
  overlay: {
    ...StyleSheet.absoluteFillObject, // Make the overlay cover the entire background
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // White with some opacity for a "blur" effect
  },
  formContainer: {
    marginVertical: 30,
    width: 340,
    height: 500,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    marginTop: -95,
    elevation: 5,
  },
  formInput: {
    width: 280,
    height: 45,
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 14,
    
    color: "#000",
    elevation: 3,
  },
  outerButton: {
    margin: 10,
    width: 150,
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: COLORS.green,
  
  },
  innerButton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  buttonText: {
    color: "black",
    
    fontSize: 15,
    textAlign: "center",
  },
  forgot: {
    
    color: COLORS.primary,
  },
  footer: {
    marginTop: "auto",
    width: "80%",
    marginBottom: 10,
  },
  footerText: {
    textAlign: "center",

    fontSize: 12,
    color: COLORS.primary,
  },
  validation: {
    fontFamily: FONTS.regular,
    marginHorizontal: 30,
    color: "white",
    },
});