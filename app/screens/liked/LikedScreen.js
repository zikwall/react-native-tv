import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const LikedScreen = () =>{
    return (
        <View style={styles.container}>
            <Text style={{textAlign:"center", color:"#000"}}>Liked...</Text>
        </View>
    );
};

export default LikedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
