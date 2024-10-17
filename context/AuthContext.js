import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState();
  useEffect(() => {
    // Check if user data exists in AsyncStorage when the app loads
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

  const login = async (email, password, role) => {
    try {
      const response = await axios.post('http://10.0.2.2:8001/api/login', {
        email,
        password,
        role,
      });

      const resData = response.data;

      if (resData.status === true) {
        const { token, user } = resData;

        // Store user data and token
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));

        setToken(token);
        setUser(user);
      } else {
        alert(resData.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed, please try again.');
    }
  };

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

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
