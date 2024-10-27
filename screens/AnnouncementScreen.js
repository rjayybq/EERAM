import React, { useEffect, useState, } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AnnouncementsScreen = () => {
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
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.content}</Text>
      <Text style={{ color: 'gray', marginTop: 5 }}>
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
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnnouncement}
        ListEmptyComponent={<Text>No announcements found.</Text>}
      />
    </View>
  );
};

export default AnnouncementsScreen;
