import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PrivacyScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{textAlign:"center", color:"#000"}}>Privacy</Text>
        </View>
    );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
