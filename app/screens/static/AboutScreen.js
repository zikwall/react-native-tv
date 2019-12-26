import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{textAlign:"center", color:"#000"}}>About</Text>
        </View>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
