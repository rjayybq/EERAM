import React from 'react';
import { View, Text, Button } from 'react-native';

const WaitingVerification = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Your account is awaiting verification by the admin.</Text>
            <Text>Please check back later.</Text>
            <Button title="Logout" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

export default WaitingVerification;
