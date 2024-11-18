
import React, { useEffect, useState, } from 'react';
import { View, Text, FlatList, ActivityIndicator, Pressable , Image} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants/Theme';
import uddlogo from '../assets/images/UDD-LOGO.png'

const StudentAnnouncement = ({navigation}) => {
    const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { fetchAnnouncements } = useContext(AuthContext);
  
  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        setError('Failed to load announcements.');
      } finally {
        setLoading(false);
      }
    };

    getAnnouncements();
  }, []);
  const renderAnnouncement = ({ item }) => (
    <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ccc', borderRadius: 10, backgroundColor: COLORS.fadeGreen, marginVertical: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.content}</Text>
      <Text style={{ color: 'black', marginTop: 5 }}>
        Posted on: {new Date(item.created_at).toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style= {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}/>;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }
  return (
    <View style={{ flex: 1, padding: 20, }}>
        <Pressable style={{ padding: 5, marginBottom: 30,
          backgroundColor: COLORS.green, width: 50, borderRadius: 10 }} 
          onPress={() => navigation.navigate('StudentPage')}>
              <Ionicons name="arrow-back" size={30} color={"white"}  />
        </Pressable>

        <Image source={uddlogo} resizeMode='contain' style={{ width: '100%', height: "10%"}}/>
          <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 20, fontFamily: FONTS.medium, fontWeight: 'bold' }}>UdD Announcement</Text>
      
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnnouncement}
        ListEmptyComponent={<Text>No announcements found.</Text>}
      />
    </View>
  )
}

export default StudentAnnouncement

