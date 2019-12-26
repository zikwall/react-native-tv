import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TermsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{textAlign:"center", color:"#000"}}>Terms</Text>
        </View>
    );
};

export default TermsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 15,
        justifyContent: "center",
    },
});
