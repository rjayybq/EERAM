import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { navigate } from '../components/navigationRef';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

   

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUser = await AsyncStorage.getItem('userData');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  
  const login = async (identifier, password, role) => {
    setMessage('');
  
    if (!identifier || !password || !role) {
      setMessage('All fields are required.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post('http://10.0.2.2:8001/api/login', {
        identifier, // use 'identifier' for both student and guardian
        password,
        role,
      });
  
      const resData = response.data;
      if (resData.status === true) {
        const { token, user, is_verified, role } = resData;
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        console.log("Token saved:", response.data.token);
        setToken(token);
        setUser(user);
        
        if (is_verified) {
          // Redirect based on role
          if (role === 'guardian') {
            navigate('Guardian');
          } else if (role === 'student') {
            navigate('StudentPage');
          }
        } else {
          navigate('WaitingVerification');
        }
      } else {
        setMessage(resData.message || 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(
        error.response
          ? error.response.data.message || 'Login failed, please try again.'
          : 'Network error, please check your connection.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  
  
  // const login = async (identifier, password, role) => {
  //   setMessage('');
  //   if (!identifier || !password || !role) {
  //     setMessage('All fields are required.');
  //     return;
  //   }
  //   setLoading(true);
  
  //   try {
  //     const response = await axios.post('http://10.0.2.2:8001/api/login', {
  //       [role === 'student' ? 'student_id' : 'email']: identifier,
  //       password,
  //       role,
  //     });
  
  //     const resData = response.data;
  //     if (resData.status === true) {
  //       const { token, user} = resData;
  //       await AsyncStorage.setItem('userToken', token);
  //       await AsyncStorage.setItem('userData', JSON.stringify(user));
  
  //       setToken(token);
  //       setUser(user);
  //     } else {
  //       setMessage(resData.message || 'Login failed, please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     setMessage(
  //       error.response
  //         ? error.response.data.message || 'Login failed, please try again.'
  //         : 'Network error, please check your connection.'
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  // const login = async (identifier, password, role) => {
  //   setMessage('');
  
  //   if (!identifier || !password || !role) {
  //     setMessage('All fields are required.');
  //     return;
  //   }
  
  //   setLoading(true);
  //   try {
  //     const response = await axios.post('http://10.0.2.2:8001/api/login', {
  //       [role === 'student' ? 'student_id' : 'email']: identifier,
  //       password,
  //       role,
  //     });
  
  //     const resData = response.data;
  //     if (resData.status === true) {
  //       const { token, user } = resData;
  //       await AsyncStorage.setItem('userToken', token);
  //       await AsyncStorage.setItem('userData', JSON.stringify(user));
  
  //       setToken(token);
  //       setUser(user);
  //     } else {
  //       setMessage(resData.message || 'Login failed, please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     setMessage(
  //       error.response
  //         ? error.response.data.message || 'Login failed, please try again.'
  //         : 'Network error, please check your connection.'
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://10.0.2.2:8001/api/announcements', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      return response.data.announcements;
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    }
  };

  const fetchStudentWithGuardians = async (studentId, token) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8001/api/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.student;
    } catch (error) {
      console.error('Error fetching student with guardians:', error);
      throw error;
    }
  };

  const fetchGuardianWithStudent = async (guardianId, token) => {
    try {
      const response = await axios.get(`http://10.0.2.2:8001/api/guardian/${guardianId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.guardian;
    } catch (error) {
      console.error('Error fetching guardian with student:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, message, fetchAnnouncements, fetchStudentWithGuardians, fetchGuardianWithStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

